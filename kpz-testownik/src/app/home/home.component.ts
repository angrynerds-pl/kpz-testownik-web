import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router"

import {
  DropzoneComponent,
  DropzoneConfigInterface
} from "ngx-dropzone-wrapper";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  public disabled: boolean = false;
  public config: DropzoneConfigInterface = {
    clickable: true,
    maxFiles: 1,
    autoReset: 5000,
    errorReset: 5000,
    cancelReset: 5000,
    acceptedFiles: ".json",
    url: "https://httpbin.org/post",
    createImageThumbnails: true
  };
  /*
  @ViewChild(DropzoneComponent, { static: false })
  componentRef?: DropzoneComponent;
*/
  constructor(public router : Router) {}

  public onUploadInit(args: any): void {
    console.log("onUploadInit:", args);
  }

  public onUploadError(args: any): void {
    console.log("onUploadError:", args);
  }

  public onUploadSuccess(args: any): void {
    console.log("onUploadSuccess:", args);
    this.router.navigate(['init']);
  }

  public onUploadSending(args: any): void {
    let formData: FormData = args[2];
    formData.append("user", '{"userName": "jan"}');
  }
}
