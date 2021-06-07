import {
  Component,
  ViewChild,
  ViewEncapsulation,
  ElementRef,
} from "@angular/core";
import { Router } from "@angular/router";

import { NgxFileDropEntry, FileSystemFileEntry } from "ngx-file-drop";
import { MessageService } from "../message.service";
import { QuizService } from "../quiz.service";
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent {
  public files: NgxFileDropEntry[] = [];
  @ViewChild("initQuizButton") initQuizButton: ElementRef;

  constructor(
    private router: Router,
    public messageService: MessageService,
    public quizService: QuizService,
    public authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  public dropped(files: NgxFileDropEntry[]) {
    console.log(this.authenticationService.currentUserValue)
    if (!this.authenticationService.currentUserValue) {
      this.messageService.error(
        "Należy się najpierw zalogować!"
      );
      return
    }

    this.files = files;
    if (this.files.length !== 1) {
      this.messageService.error(
        "Akceptowane są tylko pojedyncze pliki JSON z testem!"
      );
    } else {
      const droppedFile = files[0];

      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        console.log(fileEntry.name);
        fileEntry.file((file: File) => {
          this.quizService.loadQuizFile(file).then((isValid) => {
            if (isValid) {
              this.initQuizButton.nativeElement.click();
            } else {
              this.messageService.error(
                "Akceptowane są tylko pojedyncze pliki JSON z testem!"
              );
            }
          });
        });
      }
    }
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}
