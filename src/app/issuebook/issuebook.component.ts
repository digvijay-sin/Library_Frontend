import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewbookService } from '../viewbook/viewbook.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-issuebook',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './issuebook.component.html',
  styleUrl: './issuebook.component.css'
})
export class IssuebookComponent {
  books: any[] = [];
  searchQuery: string = '';

  constructor( private router: Router,private viewBookService:ViewbookService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
     this.fetchBooks();
  }

  fetchBooks(): void {
    this.viewBookService.getBooks().subscribe({
      next: (data) => {
        console.log(data);
        this.books = data;
      },
      error: (error) => {
        console.error('Error fetching books:', error);
        this.snackBar.open('Failed to load books. Please try again later.', 'OK', {
          duration: 5000,
        });
      }
    });
  }

  searchBooks(searchQuery:string): void {
    this.viewBookService.searchBook(searchQuery).subscribe({
      next: (data) => {
        console.log(data);
        this.books = data;
      },
      error: (error) => {
        console.error('Error searching books:', error);
        this.snackBar.open('Failed to load books. Please try again later.', 'OK', {
          duration: 5000,
        });
      }
    });
  }
  issueBook(id: number): void {
    console.log('the id is',id);
    this.viewBookService.sendIssueBookId(id);
    // this.bookService.deleteBook(id).subscribe(() => {
    //   this.fetchBooks(); // Refresh the list after deletion
    // });
    this.router.navigate(['/dashboard/issue-student']);
  }
  onBack(){
    this.router.navigate(['/dashboard'])
  }
}
