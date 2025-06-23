import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { MySources } from './pages/my-sources/my-sources';
import { Filter } from './pages/filter/filter';
import { Schedule } from './pages/schedule/schedule';
import { NewSource } from './pages/new-source/new-source';

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
    path: 'new-source',
    component: NewSource,
  },
  {
    path: 'filter',
    component: Filter,
  },
  {
    path: 'schedule',
    component: Schedule,
  },
];
