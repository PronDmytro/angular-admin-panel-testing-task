import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {

  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  public setItem(key: string, data: any): void {
    localStorage.setItem(key, data);
  }
  public getItem(key: string): any {
    return localStorage.getItem(key);
  }

}
