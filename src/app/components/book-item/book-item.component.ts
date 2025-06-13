import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../types/Book';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-item',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './book-item.component.html',
  styleUrl: './book-item.component.scss'
})


export class BookItemComponent {

  @Input() book!: Book;
  @Output() deleteBook = new EventEmitter<void>();
  @Output() editRequest = new EventEmitter<void>();

  

  triggerEdit() {
    this.editRequest.emit();
  }

  delete() {
    this.deleteBook.emit(); 
  }


}
