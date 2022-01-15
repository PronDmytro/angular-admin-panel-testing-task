import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  public constructor(
    private http: HttpClient,
    private conf: ConfigurationService,
  ) {
  }

  protected get apiPrefix() {
    return this.conf.apiUrl;
  }

  public get<Res = null>(
    path: string,
    params: HttpParams = new HttpParams(),
  ): Observable<Res | never> {
    return this.http
      .get<Res>(`${this.apiPrefix}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

  public put<Req = object, Res = null>(path: string, body?: Req): Observable<Res | never> {
    return this.http
      .put<Res>(`${this.apiPrefix}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  public post<Req = object, Res = null>(path: string, body?: Req): Observable<Res | never> {
    return this.http
      .post<Res>(`${this.apiPrefix}${path}`, body)
      .pipe(catchError(this.formatErrors));
  }

  public delete<Res = null>(path: string): Observable<Res | never> {
    return this.http
      .delete<Res>(`${this.apiPrefix}${path}`)
      .pipe(catchError(this.formatErrors));
  }


  private formatErrors(error: any): Observable<never> {
    return throwError(error);
  }

}
