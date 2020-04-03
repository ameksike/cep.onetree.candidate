import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { IdentityService } from './identity.service';

@Injectable()
export class GuardService implements CanActivate {

  constructor(
    private srvUser: IdentityService,
    private router: Router
  ) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.srvUser.isAuth()) {
      return true;
    } else {
      this.router.navigate(['/user/identity/login']);
      return false;
    }
  }

}
