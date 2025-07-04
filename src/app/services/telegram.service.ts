import { Injectable } from '@angular/core';
import { TelegramUser } from '../models/telegram.model';

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  constructor() {}

  getUser(): TelegramUser | null {
    const tg = (window as any).Telegram?.WebApp;
    const user = tg?.initDataUnsafe?.user;

    if (!user?.id) {
      console.error('Не удалось получить Telegram ID пользователя');
      return null;
    }

    return {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      photo_url: user.photo_url,
    };
  }
}
