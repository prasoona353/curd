import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
// import publicIp = require('public-ip')

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptorService {
    loggedUser: any;
    ipAddress: any;

    constructor() {

    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            request = request.clone({
                setHeaders: {
                    "Content-type": "application/json; charset=UTF-8"  
                }
            });
        return next.handle(request)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        // console.log(event);
                        // A client-side or network error occurred. Handle it accordingly.
                    }
                    // return an observable with a user-facing error message
                    //   return throwError(
                    //     'Something bad happened; please try again later.');
                    // }
                },
                    error => {
                        console.log(error);
                    })
            );
    }
}
