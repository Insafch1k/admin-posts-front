import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './description.html',
  template: `<ng-content></ng-content>`,
  styleUrl: './description.scss',
})
export class Description {
  @Input() borderRadius: string = '20px';
  @Input() marginBottom: string = '20px';
  @Input() minWidth: string = 'calc(100% - 20px)';
  @Input() padding: string = '10px';

  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    this.clicked.emit();
  }
}
