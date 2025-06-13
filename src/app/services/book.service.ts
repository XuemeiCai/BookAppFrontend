import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../types/Book';

@Injectable({
  providedIn: 'root'
})

export class BookService {
  private bookListUrl = 'https://localhost:5001/api/books'; 

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.bookListUrl);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.bookListUrl, book);
  }

  updateBook(id: number, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.bookListUrl}/${id}`, book);
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.bookListUrl}/${id}`);
  }

  searchBooks(keyword: string): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.bookListUrl}/search?term=${encodeURIComponent(keyword)}`);

  }
}
