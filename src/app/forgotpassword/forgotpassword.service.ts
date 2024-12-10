import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlService } from '../url.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordService {

  constructor(private http: HttpClient,private urlService:UrlService) {}

  getotp(email: string): Observable<any> {
    return this.http.get<any>(`${this.urlService.getOtpSentUrl()}`, {
      params: { email: email }
    });
  }

  verifyOtp(otp:string): Observable<any> {
    return this.http.get<any>(`${this.urlService.getVerifyOtpUrl()}`, {
      params: { otp: otp }
    });
  }

  updatepassword(formdata:any):Observable<any>{
    return this.http.put<any>(`${this.urlService.getUpdatePasswordUrl()}`,formdata);
  }
}
