import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  isCollapsed: boolean = true;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
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
    this.router.navigate(["/"]);
  }

  isLoggedIn(): boolean {
    return this.authenticationService.currentUserValue !== null;
  }
}
