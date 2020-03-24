import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

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
    private router: Router
  ) {}

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

    if (this.registerForm.invalid) {
      return;
    }

    this.router.navigate([this.returnUrl]);
  }
}
