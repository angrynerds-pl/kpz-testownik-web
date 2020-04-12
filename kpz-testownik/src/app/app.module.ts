import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';

import {
  DropzoneModule,
  DropzoneConfigInterface,
  DROPZONE_CONFIG
} from "ngx-dropzone-wrapper";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { InitComponent } from './init/init.component';
import { QuestionComponent } from './question/question.component';
import { SummaryComponent } from './summary/summary.component';
import { TokenInterceptor } from './token.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { TopBarComponent } from './top-bar/top-bar.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    InitComponent,
    QuestionComponent,
    SummaryComponent,
    TopBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DropzoneModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: DROPZONE_CONFIG, useValue: DEFAULT_DROPZONE_CONFIG },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
