import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import {
  Channel,
  ChannelSchedule,
  ChannelSource,
  ChannelStyle,
} from '../models/channel.model';
import { API } from '../constants/api.constants';
import { TelegramService } from './telegram.service';

@Injectable({
  providedIn: 'root',
})
export class ChannelService {
  private channelsSubject = new BehaviorSubject<Channel[]>([]);
  private stylesById: { [key: number]: ChannelStyle } = {};
  private scheduleById: { [key: number]: ChannelSchedule } = {};
  private sourceById: { [key: number]: ChannelSource[] } = {};

  private stylesSubject = new BehaviorSubject<{ [key: number]: ChannelStyle }>(
    {}
  );
  private scheduleSubject = new BehaviorSubject<{
    [key: number]: ChannelSchedule;
  }>({});
  private sourceSubject = new BehaviorSubject<{
    [key: number]: ChannelSource[];
  }>({});

  constructor(
    private http: HttpClient,
    private telegramService: TelegramService
  ) {
    this.loadChannels();
  }

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

  private mockChannelStyle: ChannelStyle = {
    topic: '📚 Образование и саморазвитие',
    styleTetx: 'Написать данный текст',
    keyWords: ['лол', 'кек', 'приятный'],
  };

  private mockChannelSchedule: ChannelSchedule = {
    posts: [
      { name: '1 пост', time: '10:00', date: '25.06' },
      { name: '2 пост', time: '11:00', date: '25.06' },
      { name: '3 пост', time: '12:00', date: '26.06' },
    ],
    duplication: true,
    random: false,
  };

  private mockChannelSource: ChannelSource[] = [
    {
      name: 'Grok',
      photo: '../../../assets/mock/grok.png',
      link: 'https://grok',
    },
    {
      name: 'Roblox wiki',
      photo: '../../../assets/mock/pk.png',
      link: 'https://roblox.fandom.com/wiki/Roblox',
    },
  ];

  loadChannels() {
    const telegramId = this.telegramService.getUser();

    this.http
      .get<Channel[]>(`/api/channels?telegramId=${telegramId}`)
      .subscribe({
        next: (channels) => {
          this.channelsSubject.next(channels);
          this.loadAllChannelStyles();
          this.loadAllChannelSchedules();
          this.loadAllChannelSources();
        },
        error: (err) => {
          console.error('Ошибка при загрузке каналов:', err);
          this.channelsSubject.next(this.mockChannels);
          this.loadAllChannelStyles();
          this.loadAllChannelSchedules();
          this.loadAllChannelSources();
        },
      });
  }

  loadAllChannelStyles(): void {
    this.getChannels().subscribe((channels) => {
      channels.forEach((channel) => {
        this.loadChannelStyle(channel.id);
      });
    });
  }

  loadChannelStyle(id: number): void {
    this.http.get<ChannelStyle>(API.GET_CHANNEL_STYLE(id)).subscribe({
      next: (style) => {
        this.stylesById[id] = style;
        this.stylesSubject.next(this.stylesById);
      },
      error: (err) => {
        console.error(`Ошибка при загрузке стиля канала (id: ${id}):`, err);
        this.stylesById[id] = this.mockChannelStyle;
        this.stylesSubject.next(this.stylesById);
      },
    });
  }

  loadAllChannelSchedules() {
    this.getChannels().subscribe((channels) => {
      channels.forEach((channel) => {
        this.loadChannelSchedule(channel.id);
      });
    });
  }

  loadChannelSchedule(id: number): void {
    this.http.get<ChannelSchedule>(API.GET_CHANNEL_SCHEDULE(id)).subscribe({
      next: (schedule) => {
        this.scheduleById[id] = schedule;
        this.scheduleSubject.next(this.scheduleById);
      },
      error: (err) => {
        console.error(
          `Ошибка при загрузке расписания канала (id: ${id}):`,
          err
        );
        this.scheduleById[id] = this.mockChannelSchedule;
        this.scheduleSubject.next(this.scheduleById);
      },
    });
  }

  loadAllChannelSources(): void {
    this.getChannels().subscribe((channels) => {
      channels.forEach((channel) => {
        this.loadChannelSources(channel.id);
      });
    });
  }

  loadChannelSources(id: number): void {
    this.http.get<ChannelSource[]>(API.GET_CHANNEL_SOURCES(id)).subscribe({
      next: (sources) => {
        this.sourceById[id] = sources;
        this.sourceSubject.next(this.sourceById);
      },
      error: (err) => {
        console.error(
          `Ошибка при загрузке источников канала (id: ${id}):`,
          err
        );
        this.sourceById[id] = this.mockChannelSource.map((source) => ({
          ...source,
        }));

        this.sourceSubject.next(this.sourceById);
      },
    });
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

  getChannelSources(id: number): Observable<ChannelSource[]> {
    return this.sourceSubject.asObservable().pipe(
      map((sources) => sources[id] ?? []) // теперь sources[id] — это массив
    );
  }

  updateChannelStyle(style: ChannelStyle, channelId: number) {
    this.stylesById[channelId] = style;
    this.stylesSubject.next(this.stylesById);
  }

  updateChannelSources(
    channelId: number,
    sources: ChannelSource[]
  ): Observable<any> {
    return this.http.put(API.UPDATE_CHANNEL_SOURCES(channelId), sources);
  }

  fetchSourceInfo(link: string): Observable<ChannelSource> {
    return this.http.post<ChannelSource>(API.FETCH_CHANNEL_SOURCES, { link });
  }
}
