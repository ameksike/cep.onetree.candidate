import { Injectable, Inject } from "@angular/core";
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpEvent
} from "@angular/common/http";
import { map, tap, last } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";


@Injectable()
export class UploadimgService {

  private apiURL: string;
  private _imgUrl: string;

  public progressSource = new BehaviorSubject<number>(0);

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    this.apiURL = this.baseUrl + 'api/avatar';
  }

  imgUrl() {

  }

  upload(file: File, addMsg: Boolean = false) {
    let formData = new FormData();
    formData.append("avatar", file);

    const req = new HttpRequest(
      "POST",
      this.apiURL,
      formData,
      {
        reportProgress: true
      }
    );

    return (addMsg) ? this.http.request(req).pipe(
      map(event => this.getEventMessage(event, file)),
      tap((envelope: any) => this.processProgress(envelope)),
      last()
    ) : this.http.request(req);
  }

  processProgress(envelope: any): void {
    if (typeof envelope === "number") {
      this.progressSource.next(envelope);
    }
  }

  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;
      case HttpEventType.UploadProgress:
        return Math.round((100 * event.loaded) / event.total);
      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;
      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }

}
