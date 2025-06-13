import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../types/Quote';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuoteService {
  private quoteUrl = 'https://localhost:5001/api/quotes';

  constructor(private http: HttpClient) {}

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.quoteUrl);
  }

  addQuote(quote: Quote): Observable<Quote> {
    return this.http.post<Quote>(this.quoteUrl, quote);
  }
}
