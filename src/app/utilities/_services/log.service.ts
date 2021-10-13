import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { endpointAuth } from './endpoints/endpointAuth';

@Injectable({
  providedIn: 'root',
})
export class LogService implements OnInit {
  ipAddress: any = '';
  country: string | null;

  constructor(
    private http: HttpClient,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit() {}

  log(msg: any) {
    this.ngxService.start();
    this.ipAddress = localStorage.getItem('IP');
    this.country = localStorage.getItem('Country');
    var AuditLog = {
      Ip: this.ipAddress,
      Country: this.country,
      Date: moment().format('MMMM Do YYYY, h:mm:ss a'),
      Action: msg,
    };
    return this.http
      .post<any>(environment.baseUrlApi + endpointAuth.saveAuditLog, AuditLog)
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
