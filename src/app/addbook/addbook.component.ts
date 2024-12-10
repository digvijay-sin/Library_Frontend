import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddbookService } from './addbook.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-addbook',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './addbook.component.html',
  styleUrl: './addbook.component.css'
})
export class AddbookComponent {
  bookForm!:FormGroup;

constructor(private fb: FormBuilder,private router:Router,private addBook:AddbookService,private snackBar: MatSnackBar){
  this.bookForm = this.fb.group({
    bookId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]], 
    name: ['', Validators.required],
    isbn: ['', [Validators.required]], 
    publisher: ['', Validators.required],
    edition: ['', Validators.required],
    price: ['', [Validators.required, Validators.min(0)]], 
    copies: ['', [Validators.required, Validators.min(1)]],
  });
}


onSubmit(): void {
  if (this.bookForm.valid) {
    const formData = this.bookForm.value;
    
    this.addBook.createBook(formData).subscribe({
      next: (response) => {
        console.log('Book added successfully', response);
        this.snackBar.open('Book added successfully!', 'OK', {
          duration: 3000,
        }).afterDismissed().subscribe(() => {
          // this.router.navigate(['/dashboard']);
        });
        this.bookForm.reset();
      },
      error: (error) => {
        console.log('Error while adding book', error);
        this.snackBar.open('Error while adding the book', 'OK', {
          duration: 3000,
        }).afterDismissed().subscribe(() => {
          // You can perform additional actions here if needed
        });
      }
    });
  } else {
    this.snackBar.open('Please enter valid book information and try again!', 'OK', {
      duration: 3000,
    });
  }
}

get control() {
  return this.bookForm.controls;
}
  onBack(){
    this.router.navigate(['/dashboard']);
  }
}
