declare var bootstrap: any; 
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookItemComponent } from '../book-item/book-item.component';
import { Book } from '../../types/Book';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book.service';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [
    BookItemComponent, 
    CommonModule,
    FormsModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.scss'
})
export class HomepageComponent implements OnInit {

  searchTerm = '';
  books: Book[] = [];
  newBook: Book = {
    title: '',
    author: '',
    isbn: '',
    imagePath: ''
  };

  editBookIndex: number | null = null;
  editedBook: Book = { title: '', author: '', isbn: '', imagePath:'' };

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    this.bookService.getBooks().subscribe({
      next: (data) => (this.books = data),
      error: (err) => console.error('Failed to fetch books', err)
    });
  }

  addBook() {
    if (this.newBook.title && this.newBook.author) {
      this.bookService.addBook(this.newBook).subscribe({
        next: (createdBook) => {
          this.books.push(createdBook);
          this.newBook = { title: '', author: '', isbn: '', imagePath: '' };

          const modalEl = document.getElementById('newBookModal');
          const modal = bootstrap.Modal.getInstance(modalEl!);
          modal?.hide();
        },
        error: (err) => console.error('Failed to add book', err)
      });
    }
  }

  removeBook(index: number) {
    const bookToDelete = this.books[index];
    if (!bookToDelete?.id) return;
  
    this.bookService.deleteBook(bookToDelete.id).subscribe({
      next: () => this.books.splice(index, 1),
      error: (err) => console.error('Failed to delete book', err)
    });
  }

  startEdit(index: number) {
    this.editBookIndex = index;
    this.editedBook = { ...this.books[index] };
  
    const modalEl = document.getElementById('editBookModal');
    if (modalEl) {
      const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modalInstance.show();
    }
  }

  saveEdit() {
    if (this.editBookIndex !== null && this.editedBook.id != null) {
      this.bookService.updateBook(this.editedBook.id, this.editedBook).subscribe({
        next: (updatedBook) => {
          this.books[this.editBookIndex!] = updatedBook;
  
          const modalEl = document.getElementById('editBookModal');
          if (modalEl) {
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            modalInstance?.hide();
          }
  
          this.editBookIndex = null;
        },
        error: (err) => console.error('Failed to update book', err)
      });
    }
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.bookService.searchBooks(this.searchTerm).subscribe({
        next: (result) => this.books = result,
        error: (err) => console.error('Search failed', err)
      });
    } else {
      this.loadBooks();
    }
  }


}
