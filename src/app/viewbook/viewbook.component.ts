import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ViewbookService } from './viewbook.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-viewbook',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './viewbook.component.html',
  styleUrl: './viewbook.component.css'
})
export class ViewbookComponent {
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

  deleteBook(id: number): void {
    this.viewBookService.deleteBook(id).subscribe({
      next: () => {
        this.snackBar.open('Book deleted successfully', 'OK', {
          duration: 3000
        });
        this.fetchBooks();
      },
      error: (err) => {
        console.error('Error deleting book:', err);
        this.snackBar.open('Failed to delete the book. Please try again later.', 'OK', {
          duration: 3000
        });
      }
    });
  }
  
  onBack(){
    this.router.navigate(['/dashboard']);
  }

}
