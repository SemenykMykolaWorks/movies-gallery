import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  public get(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  public set(key: string, val: any): void {
    localStorage.setItem(key, JSON.stringify(val));
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }
}
