import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Quote } from '../../types/Quote';

@Component({
  selector: 'app-quote-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './quote-item.component.html',
  styleUrl: './quote-item.component.scss'
})
export class QuoteItemComponent {
  @Input() quote!: Quote;
  @Output() deleteQuote = new EventEmitter<void>();
  @Output() editRequest = new EventEmitter<void>();
  
  triggerEdit() {
    this.editRequest.emit();
  }

  delete() {
    this.deleteQuote.emit(); 
  }

}
