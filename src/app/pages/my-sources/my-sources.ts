import { Component } from '@angular/core';
import { Title } from '../../components/title/title';
import { Description } from '../../components/description/description';
import { Source } from '../../models/source.model';
import { CommonModule } from '@angular/common';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-my-sources',
  imports: [Title, Description, CommonModule, Button],
  templateUrl: './my-sources.html',
  styleUrl: './my-sources.scss'
})
export class MySources {
  sources: Source[] = [
  { name: 'Roblox Wiki', url: 'https://roblox.fandom.com', type: "Википедия" },
  { name: 'Angular Blog', url: 'https://nodejs.org/en', type: "Блог" },
  { name: 'Angular Blog', url: 'https://zilant-it.ru/', type: "Блог" },
];

getFaviconUrl(siteUrl: string): string {
  try {
    const url = new URL(siteUrl);
    return `${url.protocol}//${url.hostname}/favicon.ico`;
  } catch (e) {
    return 'assets/icons/default-favicon.svg';
  }
}
}
