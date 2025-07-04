import { Component, OnInit } from '@angular/core';
import { Title } from '../../components/title/title';
import { ChannelSelection } from '../../components/channel-selection/channel-selection';
import {
  Channel,
  ChannelPost,
  ChannelSchedule,
  Weekday,
} from '../../models/channel.model';
import { ChannelService } from '../../services/channel.service';
import { CommonModule } from '@angular/common';
import { Description } from '../../components/description/description';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-schedule',
  imports: [Title, ChannelSelection, CommonModule, Description, Button],
  templateUrl: './schedule.html',
  styleUrl: './schedule.scss',
})
export class Schedule implements OnInit {
  channels: Channel[] = [];
  selectedChannelId: number | null = null;
  selectedChannelSchedule: ChannelSchedule | null = null;
  selectedDay: string | null = null;
  selectedPostsDay: ChannelPost[] | null = null;
  currentDate = new Date();
  weekLabel = '';
  weekday: Weekday[] = [];

  constructor(private channelService: ChannelService) {}

  ngOnInit(): void {
    this.channelService.getChannels().subscribe((data) => {
      this.channels = data;
    });
    this.updateWeek();

    const today = new Date();
    const todayStr =
      today.getDate().toString().padStart(2, '0') +
      '.' +
      (today.getMonth() + 1).toString().padStart(2, '0');
    this.selectedDay = todayStr;
  }

  onChannelSelected(channelId: number) {
    this.selectedChannelId = channelId;
    this.channelService.getChannelSchedule(channelId).subscribe((schedule) => {
      this.selectedChannelSchedule = schedule || null;
      if (this.selectedDay) {
        this.toogleDay(this.selectedDay);
      }
    });
    console.log(this.selectedChannelSchedule);
  }

  weekAge() {
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.updateWeek();
  }

  weekAhead() {
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.updateWeek();
  }

  updateWeek() {
    const monday = this.getMonday(this.currentDate);
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

    this.weekday = days.map((name, i) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);

      const dayOnly = date.getDate().toString().padStart(2, '0');
      const dayFull = date.getDate().toString().padStart(2, '0');
      const monthFull = (date.getMonth() + 1).toString().padStart(2, '0');

      return {
        name,
        date: dayOnly,
        fullDate: `${dayFull}.${monthFull}`,
      };
    });

    const first = this.weekday[0].fullDate;
    const last = this.weekday[6].fullDate;
    this.weekLabel = `Неделя ${first} - ${last}`;
  }

  getMonday(date: Date): Date {
    const day = date.getDay();
    const diff = (day + 6) % 7;
    const monday = new Date(date);
    monday.setDate(date.getDate() - diff);
    return monday;
  }

  toogleDay(day: string) {
    if (this.selectedDay !== day) {
      this.selectedDay = day;
    }

    if (!this.selectedChannelSchedule?.posts) {
      this.selectedPostsDay = null;
      return;
    }

    this.selectedPostsDay = this.selectedChannelSchedule.posts.filter(
      (post) => {
        return post.date === day;
      }
    );
  }
}
