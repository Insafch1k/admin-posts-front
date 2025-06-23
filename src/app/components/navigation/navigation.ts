import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [RouterModule, CommonModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.scss',
  standalone: true,
})
export class Navigation {
  navLinks = [
    {
      path: '/',
      label: 'Главная',
      icon: 'assets/icons/nav/home.svg',
      iconActive: 'assets/icons/nav/home(1).svg',
    },
    {
      path: '/my-sources',
      label: 'Источники',
      icon: 'assets/icons/nav/documment.svg',
      iconActive: 'assets/icons/nav/documment(1).svg',
    },
    {
      path: '/filter',
      label: 'Стиль',
      icon: 'assets/icons/nav/filter.svg',
      iconActive: 'assets/icons/nav/filter(1).svg',
    },
    {
      path: '/schedule',
      label: 'Расписание',
      icon: 'assets/icons/nav/time.svg',
      iconActive: 'assets/icons/nav/time(1).svg',
    },
  ];

  constructor(public router: Router) {}

  isActive(path: string): boolean {
    return this.router.url == path;
  }
}
