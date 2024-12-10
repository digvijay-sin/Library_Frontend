import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UrlService } from '../url.service';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

 
    email:string='';
  constructor(private http: HttpClient,private urlService:UrlService) {}

  register(adminData: any): Observable<any> {
    return this.http.post<any>(`${this.urlService.getAdminUrl()}`, adminData);
  }

  login(userData:any):Observable<any>{
    return this.http.post<any>(`${this.urlService.getLoginUrl()}`, userData);
  }

  forgotEmail(email:string){
    this.email=email;
  }

  getforgotEmail():string{
    return this.email;
  }

}
