import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewbookService } from '../viewbook/viewbook.service';
import { IssuebookService } from './issuestudentbook.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-issuestudent',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './issuestudent.component.html',
  styleUrl: './issuestudent.component.css'
})
export class IssuestudentComponent implements OnInit{

 IssueForm:FormGroup;

constructor(private router:Router,private viewBookDetail:ViewbookService,private fb: FormBuilder,private issueBookService:IssuebookService,private snackBar: MatSnackBar){
  this.IssueForm = this.fb.group({
    bookId: ['', [Validators.required]],
    studentId: ['', Validators.required],
    issueDate: ['', Validators.required],
  });
}

ngOnInit(): void {
   this.IssueForm.patchValue({
    bookId:this.viewBookDetail.getBookId()
   });
}

onBack(){
  this.router.navigate(['/dashboard/issue-book']);
}


onSubmit(): void {
  if (this.IssueForm.valid) {
    const formData = this.IssueForm.value;

    this.issueBookService.createBookIssue(formData).subscribe({
      next: (response) => {
        this.snackBar.open('Book issue created successfully!', 'OK', {
          duration: 3000,
        });
        this.IssueForm.reset();
        this.router.navigate(['/dashboard/issue-book'])
      },
      error: (err) => {
        console.error('Error creating book issue:', err);
        this.snackBar.open('Failed to create book issue. Please enter valid studentID and bookId', 'OK', {
          duration: 3000,
        });
      }
    });
  } else {
    this.snackBar.open('Please fill out all required fields correctly.', 'OK', {
      duration: 3000,
    });
  }
}

}
