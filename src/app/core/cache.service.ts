import { Injectable } from '@angular/core';
import { ICacheservice } from './icacheservice';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CacheService implements ICacheservice {
  private requests = { };
  put(url: string, response: HttpResponse<any>): void {
    this.requests[url] = response;
  }
  get(url: string): HttpResponse<any> | undefined {
    return this.requests[url] ? this.requests[url] : undefined;
  }
  invalidateCache(): void {
    this.requests = {};
  }
  expireItem(url: string, timeoutInMilliseconds: number) {
    const itemFound = this.get(url);
    if (itemFound !== undefined) {
      setTimeout(() => {
        this.requests[url] = undefined;
      }, timeoutInMilliseconds);
    }

  }

  constructor() { }




}
