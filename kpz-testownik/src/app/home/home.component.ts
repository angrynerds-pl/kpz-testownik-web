import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { Router } from "@angular/router"

import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { MessageService } from '../message.service';
import { QuizService } from '../quiz.service';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  public files: NgxFileDropEntry[] = [];

  constructor(
    public router : Router,
    public messageService : MessageService,
    public quizService: QuizService
    ) {}

  ngOnInit(): void {

  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    if (this.files.length !== 1) {
      this.messageService.error("Akceptowane są tylko pojedyncze pliki JSON z testem");
    } else {
      const droppedFile = files[0];

      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.quizService.loadQuizFile(file).then(isValid => {
            if (isValid) {
              this.router.navigate(["/init"]);
            } else {
              this.messageService.error("Akceptowane są tylko pojedyncze pliki JSON z testem");
            }
          });
        });
      }
    }
  }

  public fileOver(event){
    console.log(event);
  }

  public fileLeave(event){
    console.log(event);
  }
}
