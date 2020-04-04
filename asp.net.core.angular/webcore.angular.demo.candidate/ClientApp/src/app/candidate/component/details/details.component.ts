import { Component, OnInit } from '@angular/core';
import { CandidateInterface } from '../../model/candidate';
import { Router, ActivatedRoute } from '@angular/router';
import { CandidateService } from '../../service/candidate.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  model: CandidateInterface;
  id: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private srvData: CandidateService
  ) {
    this.model = {
      firstname: '',
      lastname: '',
      experience: 0,
      position: '',
      avatar: '',
      date: ''
    };

  }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params.id;
    this.srvData.select(this.id).subscribe(res => {
      this.model = this.srvData.fixDateFormat(res) ;
      console.log(res);
    });
  }

  goback(item) {
    this.router.navigate(['/candidate']);
  }
}
