import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { Channel } from '../../models/channel.modul';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-channel-selection',
  imports: [CommonModule],
  templateUrl: './channel-selection.html',
  styleUrl: './channel-selection.scss',
})
export class ChannelSelection implements OnChanges {
  @Input() channels: Channel[] = [];
  @Output() channelSelected = new EventEmitter<number>();

  channelSelectedId: number | null = null;

  ngOnChanges(): void {
    if (this.channels.length > 0 && this.channelSelectedId === null) {
      this.channelSelectedId = this.channels[0].id;
      this.channelSelected.emit(this.channelSelectedId);
    }
  }

  selectChannel(channelId: number) {
    this.channelSelectedId = channelId;
    this.channelSelected.emit(channelId);
  }
}
