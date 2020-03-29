import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../../service/identity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(
    private srvUser: IdentityService,
    private router: Router
  ) { }


  ngOnInit() {
  }

}
