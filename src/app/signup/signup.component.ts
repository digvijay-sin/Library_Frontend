import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from './signup.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
     signupForm!:FormGroup;
     constructor(private fb: FormBuilder,private router:Router,private signup:SignupService,private snackBar: MatSnackBar) {
      this.signupForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]]
      });
    }
  
    onRegister(): void {
      if (this.signupForm.valid) {
        const formData = this.signupForm.value;
       
        this.signup.register(formData).subscribe({
          next: (response) => {
            console.log('Registration successful', response);
            this.snackBar.open('Registration successful!', 'OK', {
              duration: 3000, 
            }).afterDismissed().subscribe(() => {
              this.router.navigate(['/login']);
            });
            this.signupForm.reset();
          },
          error: (error) => {
            console.error('Registration error', error);
          }
        });
      } else {
        console.log('Form is not valid');
      }
    }


    get control() {
      return this.signupForm.controls;
    }
    onBack(){
      this.router.navigate(['/login']);
    }
}
