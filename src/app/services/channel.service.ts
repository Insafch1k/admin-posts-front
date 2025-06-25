import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import {
  Channel,
  ChannelSchedule,
  ChannelStyle,
} from '../models/channel.model';
import { API } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private channelsSubject = new BehaviorSubject<Channel[]>([]);
  private stylesById: { [key: number]: ChannelStyle } = {};
  private stylesSubject = new BehaviorSubject<{ [key: number]: ChannelStyle }>(
    {}
  );
  private scheduleById: { [key: number]: ChannelSchedule } = {};
  private scheduleSubject = new BehaviorSubject<{
    [key: number]: ChannelSchedule;
  }>({});

  constructor(private http: HttpClient) {
    this.loadChannels();
  }

  private mockChannelStyle: ChannelStyle = {
    topic: '📚 Образование и саморазвитие',
    styleTetx: 'Написать данный текст',
    keyWords: ['лол', 'кек', 'приятный'],
  };

  private mockChannels: Channel[] = [
    {
      id: 1,
      name: 'Tech News',
      avatarUrl: '../../../assets/mock/avatar1.jpg',
    },
    {
      id: 2,
      name: 'Fun Zone',
      avatarUrl: '../../../assets/mock/avatar2.png',
    },
    {
      id: 4,
      name: 'Family First',
      avatarUrl: '../../../assets/mock/avatar1.jpg',
    },
    {
      id: 5,
      name: 'Tech News',
      avatarUrl: '../../../assets/mock/avatar1.jpg',
    },
  ];

  private mockChannelSchedule: ChannelSchedule = {
    posts: [
      { name: '1 пост', time: '10:00', date: '25.06' },
      { name: '2 пост', time: '11:00', date: '25.06' },
      { name: '3 пост', time: '12:00', date: '26.06' },
    ],
    duplication: true,
    random: false,
  };

  private loadChannels() {
    setTimeout(() => {
      this.channelsSubject.next(this.mockChannels);
    }, 1500);
    // this.http.get<Channel[]>(API.CHANNELSTYLE.GET_ALL).subscribe(data => {
    //   this.channelsSubject.next(data);
    // });
    this.loadAllChannelStyles();
    this.loadAllChannelSchedules();
  }

  loadAllChannelStyles(): void {
    this.getChannels().subscribe((channels) => {
      channels.forEach((channel) => {
        this.loadChannelStyle(channel.id);
      });
    });
  }

  loadChannelStyle(id: number): void {
    setTimeout(() => {
      this.stylesById[id] = this.mockChannelStyle;
      this.stylesSubject.next(this.stylesById);
    }, 1500);
    // this.http
    //   .get<ChannelStyle>(API.CHANNELSTYLE.GET_CHANNEL_STYLE(id))
    //   .subscribe((style) => {
    //     this.stylesById[id] = style;
    //     this.stylesSubject.next(this.stylesById);
    //   });
  }

  loadAllChannelSchedules() {
    this.getChannels().subscribe((channels) => {
      channels.forEach((channel) => {
        this.loadChannelSchedule(channel.id);
      });
    });
  }

  loadChannelSchedule(id: number) {
    setTimeout(() => {
      this.scheduleById[id] = this.mockChannelSchedule;
      this.scheduleSubject.next(this.scheduleById);
    }, 1500);
    // this.http
    //   .get<ChannelSchedule>(API.CHANNELSTYLE.GET_CHANNEL_STYLE(id))
    //   .subscribe((schedule) => {
    //     this.scheduleById[id] = schedule;
    //     this.scheduleSubject.next(this.scheduleById);
    //   });
  }

  getChannels(): Observable<Channel[]> {
    return this.channelsSubject.asObservable();
  }

  getChannelStyle(id: number): Observable<ChannelStyle | undefined> {
    return this.stylesSubject.asObservable().pipe(map((styles) => styles[id]));
  }

  getChannelSchedule(id: number): Observable<ChannelSchedule | undefined> {
    return this.scheduleSubject
      .asObservable()
      .pipe(map((schedules) => schedules[id]));
  }

  updateChannelStyle(style: ChannelStyle, channelId: number) {
    this.stylesById[channelId] = style;
    this.stylesSubject.next(this.stylesById);
  }
}
