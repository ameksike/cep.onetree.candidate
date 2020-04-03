import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { IdentityService } from '../../service/identity.service';
import { Router } from '@angular/router';
import { AccountUser } from '../../model/account.user';

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrls: ['./identity.component.css']
})
export class IdentityComponent implements OnInit {

  private frmGroup: FormGroup;

  constructor(
    private frmBuilder: FormBuilder,
    private srvUser: IdentityService,
    private router: Router
  ) { }

  ngOnInit() {
    this.frmGroup = this.frmBuilder.group({
      email: '',
      password: '',
    });
  }

  login() {
    let userInfo: AccountUser = Object.assign({}, this.frmGroup.value);
    this.srvUser.login(userInfo).subscribe(
      token => this.router.navigate(['/']),
      error => this.handlerError(error)
    );
  }

  cancel() {
    this.router.navigate(['/']);
  }


  register() {
    this.router.navigate(['/user/account/register']);
  }

  handlerError(error) {
    if (error && error.error) {
      alert(error.error[""]);
    }
  }

}
