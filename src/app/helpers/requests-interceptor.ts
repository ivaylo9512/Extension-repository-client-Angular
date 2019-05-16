import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class RequestsInterceptor implements HttpInterceptor {
    baseUrl : string
    constructor(private authService: AuthService) {
        this.baseUrl = 'http://localhost:8090'
     }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.authService.isLoggedIn) {
            request = request.clone({
                setHeaders: {
                    Authorization: localStorage.getItem('Authorization')
                }
            });
        }

        request = request.clone({url : this.baseUrl + request.url})
        return next.handle(request).pipe(catchError(err => {
            const error = err.message || err.statusText;
            console.log(error)
            return throwError(error)
        }))
    }
}