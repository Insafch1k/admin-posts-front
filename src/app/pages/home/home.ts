import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../../services/channel.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(private channelService: ChannelService) {}
}
