import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  reqWithAuth: HttpRequest<any>;
  constructor() {} 
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {  
    let authToken = '';
    if (!authToken) {
     this.reqWithAuth = req.clone({      
        setHeaders: {
          "text":'TExt'
        },
      });   
    }  else {
      this.reqWithAuth = req.clone({      
        setHeaders: {
          "text":'TExt'
        },
      });   
    }
    return next.handle(this.reqWithAuth);
  }
}
