import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';


@Injectable({ providedIn: 'root' })
export class HttpTokenInterceptor implements HttpInterceptor {

  public constructor(
    private authService: AuthService,
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headersConfig: any = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    if (this.authService.isLoggedIn()) {
      headersConfig.Authorization = `Bearer ${this.authService.getToken()}`;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request);
  }

}
