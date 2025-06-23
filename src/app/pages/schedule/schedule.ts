import { Component, OnInit } from '@angular/core';
import { Title } from '../../components/title/title';
import { ChannelSelection } from '../../components/channel-selection/channel-selection';
import { Channel } from '../../models/channel.modul';
import { ChannelService } from '../../services/channel.service';

@Component({
  selector: 'app-schedule',
  imports: [Title, ChannelSelection],
  templateUrl: './schedule.html',
  styleUrl: './schedule.scss',
})
export class Schedule implements OnInit {
  channels: Channel[] = [];
  selectedChannelId: number | null = null;

  constructor(private channelService: ChannelService) {}

  ngOnInit(): void {
    this.channelService.getChannels().subscribe((data) => {
      this.channels = data;
    });
  }

  onChannelSelected(channelId: number) {
    this.selectedChannelId = channelId;
  }
}
