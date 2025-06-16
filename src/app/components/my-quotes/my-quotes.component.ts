import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../types/Quote';

@Component({
  selector: 'app-my-quotes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './my-quotes.component.html',
  styleUrl: './my-quotes.component.scss'
})
export class MyQuotesComponent implements OnInit {
  quotes: Quote[] = [];
  newQuote: Quote = {
    text: '',
    author: ''
  };

  constructor(private quoteService: QuoteService) {}

  ngOnInit(): void {
    this.loadQuotes();
  }

  loadQuotes() {
    this.quoteService.getQuotes().subscribe({
      next: (data) => this.quotes = data,
      error: (err) => console.error('Failed to fetch quotes', err)
    });
  }

  addQuote() {
    if (this.newQuote.text) {
      this.quoteService.addQuote(this.newQuote).subscribe({
        next: (quote) => {
          this.quotes.push(quote);
          this.newQuote = { text: '', author: '' };
        },
        error: (err) => console.error('Failed to add quote', err)
      });
    }
  }
}
