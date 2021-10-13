import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { endpointAuth } from './endpoints/endpointAuth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private ngxService: NgxUiLoaderService
  ) {}

  login(model: any) {
    this.ngxService.start();
    return this.http
      .post<any>(environment.baseUrlApi + endpointAuth.saveAuditLog, model)
      .pipe(
        map((response) => {
          this.ngxService.stop();
          return response;
        }),
        catchError((error: any) => {
          console.log(error);
          this.ngxService.stop();
          return error;
        })
      );
  }
}
