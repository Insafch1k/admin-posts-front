import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MySources } from './pages/my-sources/my-sources';
import { Filter } from './pages/filter/filter';
import { Schedule } from './pages/schedule/schedule';
import { NewSchedule } from './pages/new-schedule/new-schedule';
import { Channels } from './pages/channels/channels';
import { Posts } from './pages/posts/posts';
import { Subscription } from './pages/subscription/subscription';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'my-sources',
    component: MySources,
  },
  {
    path: 'filter',
    component: Filter,
  },
  {
    path: 'schedule',
    component: Schedule,
  },
  {
    path: 'new-schedule',
    component: NewSchedule,
  },
  {
    path: 'channels',
    component: Channels,
  },
  {
    path: 'posts',
    component: Posts,
  },
  {
    path: 'subscription',
    component: Subscription,
  },
];
