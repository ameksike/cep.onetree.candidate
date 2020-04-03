import { Component, OnInit } from '@angular/core';
import { IdentityService } from '../../service/identity.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../service/account.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AccountUser } from '../../model/account.user';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class AccountFormComponent implements OnInit {

  private frmGroup: FormGroup;
  private id: string;

  constructor(
    private frmBuilder: FormBuilder,
    private srvAccount: AccountService,
    private srvUser: IdentityService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }
   
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == undefined)
        this.id = '0';
      else {
        this.id = params['id'];
      }
    });
    this.frmGroup = this.frmBuilder.group({
      email: '',
      password: '',
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }


  register() {
    let userInfo: AccountUser = Object.assign({}, this.frmGroup.value);
    this.srvAccount.create(userInfo).subscribe(
      token => this.router.navigate(['/']),
      error => this.handlerError(error)
    );
  }

  handlerError(error) {
    if (error && error.error) {
      alert(error.error[""]);
    }
  }

}
