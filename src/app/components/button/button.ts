import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button',
  imports: [CommonModule, RouterModule],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  @Input() color: string = '#40BFC9';
  @Input() activeColor: string = '#22A1AB';
  @Input() icon: string = '';
  @Input() link: string | null = null;
  @Input() label: string = '';
  @Output() onClick = new EventEmitter<void>();
}
