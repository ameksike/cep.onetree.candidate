import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { UploadimgService } from '../../service/uploadimg.service';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

    public progress: number;
  public message: string;

  @Output() public onFinished = new EventEmitter();
  @Input('src') imageUrl: string | ArrayBuffer;

  fileName: string;
  infoMessage: any;
  isUploading: boolean = false;
  file: File;

  constructor(
    private http: HttpClient,
    private uploader: UploadimgService
  ) {
    this.imageUrl = "Resources/Avatar/avatar01.png";
    this.fileName = "No file selected";
  }

  ngOnInit() {  }

  onSelect(file) {
    file.click();
  }

  onChange(item) {

    let file = item.files[0];
    if (file) {
      this.fileName = file.name;
      this.file = file;

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = event => {
        this.imageUrl = reader.result;
        this.onUpload(item.files);
      };
    }
  }

  public onUpload = (files) => {

    this.infoMessage = null;
    this.progress = 0;
    this.isUploading = true;

    this.uploader.upload(this.file).subscribe(event => {
      this.isUploading = false;
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response) {
        this.onFinished.emit(event.body.dbPath);
      }
    });
  }
}
