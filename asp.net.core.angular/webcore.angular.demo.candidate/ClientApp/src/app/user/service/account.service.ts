import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountUser } from '../model/account.user';
import { Observable } from 'rxjs';
import { IdentityService } from './identity.service';

@Injectable()
export class AccountService {

  private apiURL;

  constructor(
    private srvIdentity: IdentityService,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    this.apiURL = this.baseUrl + "api/account";
  }

  create(userInfo: AccountUser): Observable<any> {
    let src = this.http.post<any>(this.apiURL, userInfo);
    src.subscribe(token => this.srvIdentity.saveTokens(token),
      error => this.onError(error)
    );
    return src;
  }

  onError(error) {
    console.log("Error-AccountService: ");
    console.log(error);
  }
}
