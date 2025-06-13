import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../types/Book';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BookService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/api/books`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.baseUrl}/api/books`, book);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.baseUrl}/api/books/${id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/books/${id}`);
  }

  searchBooks(keyword: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/api/books/search?term=${encodeURIComponent(keyword)}`);

  }
}
