declare var bootstrap: any; 
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../types/Quote';
import { QuoteItemComponent } from '../quote-item/quote-item.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-my-quotes',
  standalone: true,
  imports: [CommonModule, FormsModule, QuoteItemComponent],
  templateUrl: './my-quotes.component.html',
  styleUrl: './my-quotes.component.scss'
})
export class MyQuotesComponent implements OnInit {
  quotes: Quote[] = [];
  newQuote: Quote = {
    text: '',
    author: ''
  };

  editQuoteIndex: number | null = null;
  editedQuote: Quote = { text: '', author: ''};

  constructor(private quoteService: QuoteService, private router: Router) {}

  ngOnInit(): void {
    this.resetForm();       
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url.includes('/my-quotes')) {
          this.resetForm();
        }
      });
    
      this.loadQuotes();
  }

  resetForm() {
    this.newQuote = { text: '', author: '' };
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

  removeQuote(index: number) {
    const quoteToDelete = this.quotes[index];
    if (!quoteToDelete?.id) return;
  
    this.quoteService.deleteQuote(quoteToDelete.id).subscribe({
      next: () => this.quotes.splice(index, 1),
      error: (err) => console.error('Failed to delete quote', err)
    });
  }

  startEdit(index: number){
    this.editQuoteIndex = index;
    this.editedQuote = { ...this.quotes[index] };
  
    const modalEl = document.getElementById('editQuoteModal');
    if (modalEl) {
      const modalInstance = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
      modalInstance.show();
    }
  }

  saveEdit() {
    if (this.editQuoteIndex !== null && this.editedQuote.id != null) {
      this.quoteService.updateQuote(this.editedQuote.id, this.editedQuote).subscribe({
        next: (updatedQuote) => {
          this.quotes[this.editQuoteIndex!] = updatedQuote;
  
          const modalEl = document.getElementById('editQuoteModal');
          if (modalEl) {
            const modalInstance = bootstrap.Modal.getInstance(modalEl);
            modalInstance?.hide();
          }
  
          this.editQuoteIndex = null;
        },
        error: (err) => console.error('Failed to update quote', err)
      });
    }
  }



  
}
