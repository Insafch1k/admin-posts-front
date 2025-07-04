import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../../services/channel.service';
import { TelegramService } from '../../services/telegram.service';
import { TelegramUser } from '../../models/telegram.model';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  telegramUser: TelegramUser | null = null;
  botEnabled = false;

  constructor(
    private channelService: ChannelService,
    private telegramService: TelegramService,
    private router: Router
  ) {}

  ngOnInit() {
    const tg = (window as any).Telegram?.WebApp;

    if (tg) {
      //tg.ready();

      this.telegramUser = this.telegramService.getUser();
      console.log('telegramUser', this.telegramUser);

      if (this.telegramUser?.id) {
        this.channelService.loadChannels();
      }
    } else {
      console.error('Telegram WebApp не доступен');
    }
  }

  toggleBot() {
    this.botEnabled = !this.botEnabled;
  }

  goToChannels() {
    this.router.navigate(['/channels']);
  }

  goToPosts() {
    this.router.navigate(['/posts']);
  }

  goToSubscription() {
    this.router.navigate(['/subscription']);
  }
}
