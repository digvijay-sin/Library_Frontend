import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { UrlService } from './url.service';
import { Router } from '@angular/router';


interface LoginResponse {
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private tokenExpirationTimer: any; 

  private readonly TOKEN_EXPIRATION_TIME = 300000;
   constructor(private http: HttpClient,private urlService:UrlService,private router:Router) {
    this.checkSession();
  }
  login(userData: any): Observable<any> {
    console.log("inside the login method", userData);
    return this.http.post<LoginResponse>(`${this.urlService.getLoginUrl()}`, userData).pipe(
      tap(response => {
        console.log("inside the pipe", response);
        console.log("reponse token",response.token)
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.isAuthenticated.next(true);
          this.startTokenExpirationTimer();
        }
      })
    );
  }
  logout(): void {
    localStorage.removeItem('token');
    this.isAuthenticated.next(false);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.isAuthenticated.asObservable();
  }

  private checkSession(): void {
    const token = localStorage.getItem('token');
    this.isAuthenticated.next(!!token);
    if (token) {
      this.startTokenExpirationTimer();
    }
  }

  private startTokenExpirationTimer(): void {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
      this.router.navigate(['/login'])
    }, this.TOKEN_EXPIRATION_TIME);
  }



 

  verifyToken(token: string): Observable<any> {
    console.log("inside the varify token API")
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(this.urlService.getVerifyJwtUrl(), { headers }).pipe(
      catchError(error => {
        // Handle error if necessary
        console.error('Error verifying token:', error);
        return throwError(() => new Error('Error verifying token'));
      })
    );
  }
}
