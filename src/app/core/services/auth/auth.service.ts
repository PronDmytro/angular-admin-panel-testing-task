import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ApiService } from '../api/api.service';
import { ConfigurationService } from '../configuration/configuration.service';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { Router } from '@angular/router';
import { ILoginRes } from '../../models/api/ilogin.res';
import { ILoginReq } from '../../models/api/ilogin.req';
import { IRegisterReq } from '../../models/api/iregister.req';
import { IRegisterRes } from '../../models/api/iregister.res';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {

  public readonly isLoggedIn$ = new BehaviorSubject<boolean>(false);

  public readonly AUTH_TOKEN_KEY = 'user_auth_jwt';

  public constructor(
    http: HttpClient,
    conf: ConfigurationService,
    private readonly localStorageService: LocalStorageService,
    private router: Router,
    private toastr: ToastrService,
  ) {
    super(http, conf);

    const token = this.getToken();
    if (token) {
      this.isLoggedIn$.next(true);
    }

  }

  /**
   * @return {boolean} whether user is logged in or not now
   */
  public isLoggedIn(): boolean {
    return this.isLoggedIn$.value;
  }

  public async authByToken(token: string): Promise<void> {
    this.localStorageService.setItem(this.AUTH_TOKEN_KEY, token);
    this.isLoggedIn$.next(true);
  }

  public async logout() {
    this.localStorageService.removeItem(this.AUTH_TOKEN_KEY);
    this.isLoggedIn$.next(false);
    await this.router.navigate(['auth/login']);
  }

  public getToken() {
    return this.localStorageService.getItem(this.AUTH_TOKEN_KEY);
  }

  public async auth(username: string, password: string): Promise<{ success: boolean }> {
    const resp = await firstValueFrom(
      this.post<ILoginReq, ILoginRes>('/login/', { username, password }),
    );

    if (resp.success && resp.token) {
      await this.authByToken(resp.token);
      await this.router.navigate(['account']);
      return { success: resp.success };
    } else {
      this.toastr.error(resp.message, 'Something went wrong', {
        timeOut: 3000,
      });
      return { success: resp.success };
    }
  }

  public async register(data: IRegisterReq): Promise<{ success: boolean }> {
    const resp = await firstValueFrom(
      this.post<IRegisterReq, IRegisterRes>('/register/', data),
    );

    if (resp.success && resp.token) {
      await this.authByToken(resp.token);
      await this.router.navigate(['account']);
      return { success: resp.success };
    } else {
      this.toastr.error(resp.message, 'Something went wrong', {
        timeOut: 3000,
      });
      return { success: resp.success };
    }
  }

}
