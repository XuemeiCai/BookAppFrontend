import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Quote } from '../types/Quote';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ 
  providedIn: 'root' 
})
export class QuoteService {
  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(`${this.baseUrl}/api/quotes`);
  }

  addQuote(quote: Quote): Observable<Quote> {
    return this.http.post<Quote>(`${this.baseUrl}/api/quotes`, quote);
  }

  updateQuote(id: string, quote: Quote): Observable<Quote> {
      return this.http.put<Quote>(`${this.baseUrl}/api/quotes/${id}`, quote);
    }
  
  deleteQuote(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/api/quotes/${id}`);
  }
}
