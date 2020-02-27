import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
/*Service*/
import { HelperService } from '../services/helper/helper.service';
/*RxJS*/
import { catchError } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MyHttpInterceptor implements HttpInterceptor {

  constructor(private router:Router,private helperService: HelperService) {}

  intercept(req: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {

    // Clone the request to add the new header.
    if(this.helperService.getData('currentUser')){
        req = req.clone({
        setHeaders: {
          token: `${this.helperService.getKeyData('currentUser','token')}`,
        }
      });
    }

    //send the newly created request
    return next.handle(req).pipe(catchError(err => {
      this.router.navigate(['login']); //remember to import router class and declare it in the class
            
      return throwError(err);
    }))
  }
}