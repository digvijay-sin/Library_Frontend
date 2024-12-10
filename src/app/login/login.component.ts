import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../signup/signup.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router,private signup:SignupService,private snackBar: MatSnackBar,private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     const formData = this.loginForm.value;
  //     this.signup.login(formData).subscribe({
  //       next:(response)=>{
  //         console.log('login successful', response);
  //         this.snackBar.open('Login successful!', 'OK', {
  //           duration: 0.5, 
  //         }).afterDismissed().subscribe(() => {
  //           this.router.navigate(['/dashboard']);
  //         });
  //       },
  //       error: (error) => {
  //         console.log('error while login',error);
  //         this.snackBar.open('Invalid Credentials please try again', 'OK', {
  //           duration: 3000, 
  //         }).afterDismissed().subscribe(() => {

  //         });
  //       }
  //     });
  //   }else {
  //     this.snackBar.open('Please enter username and password.', 'OK', {
  //       duration: 3000,
  //     });
  //   }
  // }
  onSubmit(): void {

    console.log("onsubmit method called on login button clicked")
    if (this.loginForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const formData = this.loginForm.value;

    this.authService.login(formData).subscribe({
      next: () => {
        console.log("inside the next")
        this.snackBar.open('Login successful!', 'OK', {
                    duration: 0.9, 
              }).afterDismissed().subscribe(() => {
               this.router.navigate(['/dashboard']);
           });
      },
      error: (err) => {
        console.error('Login failed', err);
        this.snackBar.open('Login Failed Invalid credentials!', 'OK', {
          duration: 1000, 
    }).afterDismissed().subscribe(() => {
 });
      }
    });
  }

  onSignup() {
    console.log('Redirect to Signup');
    this.router.navigate(['/signup-form']);
  }

  forgotpassword(){
    const email=this.loginForm.get('email')?.value;
    if(email){
      this.signup.forgotEmail(email);
      this.router.navigate(['/forgot-password']);
    }else{
      this.snackBar.open('Enter Emial ID for forgot password', 'OK', {
        duration: 1000, 
  })
    }
  }

  get control() {
    return this.loginForm.controls;
  }
}
