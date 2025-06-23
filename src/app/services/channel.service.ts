import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { Channel, ChannelStyle } from '../models/channel.modul';
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
    {
      id: 6,
      name: 'Family First',
      avatarUrl: '../../../assets/mock/avatar1.jpg',
    },
    {
      id: 7,
      name: 'Tech News',
      avatarUrl: '../../../assets/mock/avatar1.jpg',
    },
  ];

  private loadChannels() {
    setTimeout(() => {
      this.channelsSubject.next(this.mockChannels);
    }, 1500);
    // this.http.get<Channel[]>(API.CHANNELSTYLE.GET_ALL).subscribe(data => {
    //   this.channelsSubject.next(data);
    // });
    this.loadAllChannelStyles();
  }

  getChannels(): Observable<Channel[]> {
    return this.channelsSubject.asObservable();
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

  getChannelStyle(id: number): Observable<ChannelStyle | undefined> {
    return this.stylesSubject.asObservable().pipe(map((styles) => styles[id]));
  }

  updateChannelStyle(style: ChannelStyle, channelId: number) {
    this.stylesById[channelId] = style;
    this.stylesSubject.next(this.stylesById);
  }
}
