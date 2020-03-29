import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidateInterface } from '../../model/candidate';
import { CandidateService } from '../../service/candidate.service';
import { UploadimgService } from '../../service/uploadimg.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  id: string;
  frmGroup: FormGroup;

  constructor(
    private frmBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private srvData: CandidateService,
    private uploader: UploadimgService
  ) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.params.id;
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == undefined)
        this.id = '0';
      else {
        this.id = params['id'];
        this.srvData.select(this.id).subscribe(
          result => this.loadForm(result),
          error => this.onError(error)
        );
      }
    });

    this.frmGroup = this.frmBuilder.group({
      firstname: '',
      lastname: '',
      experience: 0,
      position: '',
      avatar: "Resources/Avatar/avatar01.png",
      date: Date.now()
    });
  }

  save() {
    
    let candidate: CandidateInterface = Object.assign({}, this.frmGroup.value);
    console.log(candidate);

    if (this.id == '0') {
      this.srvData.insert(candidate).subscribe(
        result => this.onSave(result),
        error => this.onError(error)
      );
    } else {
      candidate.candidateId = parseInt(this.id) ;
      this.srvData.update(this.id, candidate).subscribe(
        result => this.onSave(result),
        error => this.onError(error)
      );
    }
  }

  cancel() {
    this.router.navigate(['/candidate']);
  }

  onSave(result) {
    console.log(result);
    this.router.navigate(['/candidate']);
  }

  onError(error) {
    console.log(error);
  }

  loadForm(item: CandidateInterface) {
    this.frmGroup.patchValue(this.srvData.fixDateFormat(item));
  }

  onFinished(event) {
    this.frmGroup.get('avatar').setValue(event);
  }
}
