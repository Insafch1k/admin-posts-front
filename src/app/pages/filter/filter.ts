import { Component, OnInit } from '@angular/core';
import { Title } from '../../components/title/title';
import { ChannelSelection } from '../../components/channel-selection/channel-selection';
import { Channel, ChannelStyle } from '../../models/channel.model';
import { ChannelService } from '../../services/channel.service';
import { Description } from '../../components/description/description';
import { CommonModule } from '@angular/common';
import {
  CHANNEL_TOPICS,
  ChannelTopic,
} from '../../constants/channel.constants';
import { FormsModule } from '@angular/forms';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-filter',
  imports: [
    Title,
    ChannelSelection,
    Description,
    CommonModule,
    FormsModule,
    Button,
  ],
  templateUrl: './filter.html',
  styleUrl: './filter.scss',
})
export class Filter implements OnInit {
  channels: Channel[] = [];
  showTema: Boolean = false;
  themes: ChannelTopic[] = [...CHANNEL_TOPICS];
  selectedTema: ChannelTopic | null = null;
  selectedChannelStyle: ChannelStyle | null = null;
  selectedChannelId: number | null = null;
  keyword: string | null = null;

  constructor(private channelService: ChannelService) {}

  ngOnInit(): void {
    this.channelService.getChannels().subscribe((data) => {
      this.channels = data;
    });
  }

  toggleTema() {
    this.showTema = !this.showTema;
  }

  selectTema(tema: ChannelTopic) {
    if (this.selectedChannelStyle) {
      this.selectedChannelStyle.topic = tema;
      this.showTema = false;
    }
  }

  onChannelSelected(channelId: number) {
    this.selectedChannelId = channelId;
    this.channelService.getChannelStyle(channelId).subscribe((style) => {
      this.selectedChannelStyle = style
        ? {
            ...style,
            keyWords: [...(style.keyWords || [])],
          }
        : null;
      this.keyword = '';
    });
  }

  addKeyword() {
    if (!this.keyword || !this.selectedChannelStyle?.keyWords) return;
    this.selectedChannelStyle.keyWords.push(this.keyword);
    this.keyword = '';
  }

  deleteKeyword(tag: string) {
    if (this.selectedChannelStyle?.keyWords) {
      this.selectedChannelStyle.keyWords =
        this.selectedChannelStyle.keyWords.filter((t) => t !== tag);
    }
  }

  saveData() {
    if (this.selectedChannelId && this.selectedChannelStyle) {
      this.channelService.updateChannelStyle(
        this.selectedChannelStyle,
        this.selectedChannelId
      );
    }
  }
}
