import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CandidateInterface } from '../model/candidate';
import { DatePipe } from '@angular/common';

@Injectable()
export class CandidateService {

  private apiURL: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    this.apiURL = this.baseUrl + 'api/candidates';
  }

  select(id: string): Observable<CandidateInterface> {
    return this.http.get<CandidateInterface>(`${this.apiURL}/${id}`);
  }

  list(): Observable<CandidateInterface[]>  {  
    console.log(this.apiURL);
    return this.http.get<CandidateInterface[]>(this.apiURL);
  }
 
  insert(item: CandidateInterface): Observable<any> {
    return this.http.post(this.apiURL, item);
  }

  update(id: string, value: CandidateInterface): Observable<any> {
    return this.http.put(`${this.apiURL}/${id}`, value);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiURL}/${id}`, { responseType: 'text' });
  }

  fixDateFormat(item: CandidateInterface, fm: string = 'yyyy-MM-dd') {
    let dp = new DatePipe(navigator.language);
    item.date = dp.transform(item.date, fm);
    return item;
  }
}
