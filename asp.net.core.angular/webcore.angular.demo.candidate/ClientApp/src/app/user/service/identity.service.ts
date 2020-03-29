import { Injectable, Inject, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountUser } from '../model/account';
import { Observable } from 'rxjs';

@Injectable()
export class IdentityService {

  private apiURL: string;
  private _user: AccountUser;
  public user: EventEmitter<AccountUser>;


  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    this._user = null;
    this.apiURL = this.baseUrl + "api/identity";
    this.user = new EventEmitter<AccountUser>();
  }

  getToken(): string {
    return localStorage.getItem("token");
  }

  getTokenExpiration(): string {
    return localStorage.getItem("tokenExpiration");
  }

  setTokens(token: string, expiration: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('tokenExpiration', expiration);
  }

  saveTokens(value: { token: string, expiration: string }) {
    this.setTokens(value.token, value.expiration);
  }

  removeTokens() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
  }

  isAuth(): boolean {
    let exp = this.getTokenExpiration();

    if (!exp) {
      return false;
    }

    let now = new Date().getTime();
    let dateExp = new Date(exp);

    if (now >= dateExp.getTime() || this._user == null  || this._user.email == '') {
      this.removeTokens();
      return false;
    } else {
      return true;
    }
  }


  login(userInfo: AccountUser): Observable<any> {
    let src = this.http.post<any>(this.apiURL + "/login", userInfo);
    src.subscribe(
      token => this.loginSuccess(token, userInfo),
      error => console.log(error)
    );
    return src;
  }

  loginSuccess(token, user: AccountUser) {
    this.saveTokens(token);
    this._user = user;
    this.user.next(user);
  }

  logout() {
    this.removeTokens();
    this.user.next({
      email: '',
      password: ''
    });
  }

  getUser(): AccountUser{
    return this._user;
  }
}
