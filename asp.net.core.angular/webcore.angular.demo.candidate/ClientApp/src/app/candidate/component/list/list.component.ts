import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { CandidateService } from '../../service/candidate.service';
import { CandidateInterface } from '../../model/candidate';
import { MessageService } from '../../../home/component/message/message.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: CandidateInterface[];

  constructor(
    private srvData: CandidateService,
    private router: Router,
    private srvMessage: MessageService

  ) {

    
  }


  reloadData() {
    this.srvData.list().subscribe(
      result => this.list = result,
      error => this.onError(error) 
    ); 
  }

  ngOnInit() {
    this.reloadData();
  }

  onDelete(item: any) {
    this.srvData.delete(item.id).subscribe(
      data => {
        console.log(data);
        this.reloadData();
      },
      error => this.onError(error)
    );
  }

  onDetails(item: any) {
    console.log(item);
    this.router.navigate(['/candidate/details', item.id]);

  }

  onEdit(item: any) {
    console.log(item);
    this.router.navigate(['/candidate/edit', item.id]);
  }

  onAdd() {
    this.router.navigate(['/candidate/add']);
  }

  onError(error) {
    console.log(error);
    var pre = "Error - Candidate List >> ";
    var msg = typeof (error) == "string" ? error : (error.message ? error.message : (error.statusText ? error.statusText : (error.error ? error.error[""] : "")));
    this.srvMessage.error(pre + msg);
  }
}
