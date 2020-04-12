import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  isCollapsed: boolean = true;

  constructor(
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  currenUserName(): string {
    let currenUser = this.authenticationService.currentUserValue;
    if (currenUser){
      return currenUser.username;
    }
  }

  logout(): void {
    this.authenticationService.logout();
  }

  isLoggedIn(): boolean {
    return this.authenticationService.currentUserValue !== null;
  }
}
