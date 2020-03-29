import { Component } from '@angular/core';
import { IdentityService } from '../user/service/identity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  username: string;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  constructor(
    private srvUser: IdentityService,
    private router: Router
  ) {

    this.username = '';
    this.srvUser.user.subscribe(
      user => this.username = user.email
    );
  }

  isAuth() {
    return this.srvUser.isAuth();
  }

  logout() {
    this.srvUser.logout();
    this.router.navigate(['/']);
  }
}
