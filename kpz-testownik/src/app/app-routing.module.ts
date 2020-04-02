import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { InitComponent } from "./init/init.component";
import { QuestionComponent } from "./question/question.component";
import { SummaryComponent } from "./summary/summary.component";

const routes: Routes = [
  { path: "", redirectTo: "/home.php", pathMatch: "full" },
  { path: "home.php", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "init", component: InitComponent },
  { path: "question", component: QuestionComponent },
  { path: "summary", component: SummaryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
