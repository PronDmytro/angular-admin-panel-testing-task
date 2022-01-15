import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsNotLoggedInGuard implements CanActivate {

  public constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const isNotLoggedIn = !this.authService.isLoggedIn$.getValue();

    return isNotLoggedIn || this.router.navigateByUrl('/account');
  }

}
