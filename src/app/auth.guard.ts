import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, catchError, map, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}
  
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    const token = localStorage.getItem('token'); // Use consistent key
      console.log("auth guard token",token);
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    return this.authService.verifyToken(token).pipe(
      map(response => {
        if (response.valid) { 
          console.log("inside if");
          
          return true;
        } else {
          console.log("inside else")
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(error => {
        console.error('Token verification failed:', error);
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
  
}
