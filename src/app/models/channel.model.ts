import { ChannelTopic } from '../constants/channel.constants';

export interface Channel {
  id: number;
  name: string;
  avatarUrl: string;
}

export interface ChannelStyle {
  topic: ChannelTopic | null;
  styleTetx: string | null;
  keyWords: string[] | null;
}

export interface Post {
  name: string;
  time: string;
}

export interface Weekday {
  name: string;
  date: string;
  fullDate: string;
}

export interface ChannelPost {
  name: string;
  time: string;
  date: string;
}

export interface ChannelSchedule {
  posts: ChannelPost[];
  duplication: boolean;
  random: boolean;
}
