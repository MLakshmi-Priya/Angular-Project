import { Injectable, Injector } from '@angular/core';
import  { HttpInterceptor }from "@angular/common/http";
import { DatalistService } from './datalist.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: any, next: any){
    let authService = this.injector.get(DatalistService)
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }
}