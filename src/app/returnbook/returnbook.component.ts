import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReturnbookService } from './returnbook.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-returnbook',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './returnbook.component.html',
  styleUrl: './returnbook.component.css'
})
export class ReturnbookComponent {
  issueBookForm: FormGroup;
  isDataLoaded = false;

  constructor(private fb: FormBuilder,private router:Router,private returnBook:ReturnbookService,private snackBar: MatSnackBar) {
    this.issueBookForm = this.fb.group({
      studentId: ['', Validators.required],
      bookId: ['', Validators.required],
      returnDate:['',Validators.required],
      bookName: ['',Validators.required],
      course: ['',Validators.required],
      issueDate: ['',Validators.required],
      studentName: ['',Validators.required],
      branch: ['',Validators.required],
    });
   }

   searchData(): void {
    const studentId = this.issueBookForm.get('studentId')?.value;
    const bookId = this.issueBookForm.get('bookId')?.value;
  
    if (studentId && bookId) {
      this.returnBook.getStudentAndBookData(studentId, bookId).subscribe({
        next: (data) => {
          if (data) {
            const issueDate = new Date(data.issuebook.issueDate);
            this.issueBookForm.patchValue({
              bookName: data.book.name,
              course: data.student.course,
              issueDate: issueDate.toISOString().split('T')[0], 
              studentName: data.student.studentName,
              branch: data.student.branch
            });
            this.isDataLoaded = true;
          } 
        },
        error: (err) => {
          console.error('Error fetching data:', err); 
          this.snackBar.open('No data found for the provided IDs.', 'OK', {
            duration: 3000
          });
          this.isDataLoaded = false;
        }
      });
    } else {
      this.snackBar.open('Both Student ID and Book ID are required.', 'OK', {
        duration: 3000
      });
      this.isDataLoaded = false;
    }
  }
  

  onSubmit(): void {
    if (this.issueBookForm.valid) {
      const formData = this.issueBookForm.value;
      console.log("reurn data are ",formData)
      this.returnBook.returnBook(formData).subscribe({
        next: (response) => {
          console.log('Book returned successfully:', response);
          this.snackBar.open('Book returned successfully!', 'OK', {
            duration: 3000,
          });
          this.issueBookForm.reset();
          this.isDataLoaded = false;
        },
        error: (error) => {
          console.error('Error returning book:', error);
          this.snackBar.open('Failed to return the book. Please try again.', 'OK', {
            duration: 3000,
          });
        }
      });
    } else {
      this.snackBar.open('Please fill in all required fields correctly.', 'OK', {
        duration: 3000,
      });
    }
  }
  

  onBack(): void {
    this.router.navigate(['/dashboard'])
  }
}
