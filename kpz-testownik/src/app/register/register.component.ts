import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";

import { UserService } from "../user.service";
import { AuthenticationService } from "../authentication.service";
import { MessageService } from '../message.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  returnUrl: string = "/home.php";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private authenticationService: AuthenticationService,
    private messageService: MessageService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(["/"]);
    }
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        username: ["", Validators.required],
        password: ["", Validators.required],
        confirmPassword: [""]
      },
      { validator: this.checkPasswords }
    );
  }

  checkPasswords(formGroup: FormGroup) {
    let pass = formGroup.get("password").value;
    let confirmPass = formGroup.get("confirmPassword").value;

    return pass === confirmPass ? null : { notSame: true };
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    this.messageService.clear();

    if (this.registerForm.invalid) {
      return;
    }

    delete this.registerForm.value.confirmPassword;
    this.userService
      .register(this.registerForm.value)
      .pipe(first())
      .subscribe(
        data => {
          this.messageService.success('Pomyślnie zarejestrowano użytkownika', true);
          this.router.navigate(["/login"]);
        },
        error => {
          this.messageService.error(error);
        }
      );
  }
}
