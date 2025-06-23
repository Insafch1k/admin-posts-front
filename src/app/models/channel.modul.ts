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

export interface ChannelSchedule {
  data: string;
  posts: Post[];
  duplicate: boolean;
}
