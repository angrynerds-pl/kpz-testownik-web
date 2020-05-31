import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import * as HttpStatus from "http-status-codes";

import { AuthenticationService } from "./authentication.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  // TODO handle different errors
  // TODO show error message to the user
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((e: HttpErrorResponse) => {
        let errorMessage = "";

        if (e.error instanceof ErrorEvent) {
          // client-side or network error
          errorMessage = `Error: ${e.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${e.status}\nMessage: ${e.error}`;
          if (e.status === HttpStatus.UNAUTHORIZED) {
            this.authenticationService.logout();
            location.reload(true);
          }
        }

        return throwError(errorMessage);
      })
    );
  }
}
