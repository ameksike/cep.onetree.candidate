import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { CandidateService } from '../../service/candidate.service';
import { HttpClient } from '@angular/common/http';
import { CandidateInterface } from '../../model/candidate';

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

  ) {

    
  }


  reloadData() {
    this.srvData.list().subscribe(
      result => this.list = result,
      error => console.error(error) 
    ); //this.srvMessage.error(res.data['message']);
  }

  ngOnInit() {
    this.reloadData();
  }

  onDetails(item: any) {
  }

  onEdit(item: any) {
  }

  onAdd() {
    this.router.navigate(['/candidate/add', '.']);
  }

}
