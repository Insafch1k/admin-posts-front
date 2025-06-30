import { Component } from '@angular/core';
import { Title } from '../../components/title/title';
import { Description } from '../../components/description/description';
import { FormsModule } from '@angular/forms';
import { Button } from '../../components/button/button';
import { ChannelService } from '../../services/channel.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-schedule',
  imports: [Title, Description, FormsModule, Button, CommonModule],
  templateUrl: './new-schedule.html',
  styleUrl: './new-schedule.scss',
})
export class NewSchedule {
  namePost: string | null = null;

  hourPost: string = '10';
  minutePost: string = '20';

  selectedHourIndex = 0;
  selectedMinuteIndex = 0;

  constructor(private channelService: ChannelService) {}

  rawHours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0')
  );
  rawMinutes = Array.from({ length: 60 }, (_, i) =>
    i.toString().padStart(2, '0')
  );

  hours: string[] = [];
  minutes: string[] = [];

  ngOnInit() {
    this.hours = [
      ...this.rawHours.slice(-3),
      ...this.rawHours,
      ...this.rawHours.slice(0, 3),
    ];
    this.minutes = [
      ...this.rawMinutes.slice(-3),
      ...this.rawMinutes,
      ...this.rawMinutes.slice(0, 3),
    ];
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const hourCol = document.getElementById('hour-column');
      const minuteCol = document.getElementById('minute-column');

      if (hourCol) {
        const items = hourCol.querySelectorAll('.item');
        let scroll = 0;
        for (let i = 0; i < 3; i++) {
          scroll += (items[i] as HTMLElement).offsetHeight;
        }
        hourCol.scrollTop = scroll;
      }

      if (minuteCol) {
        const items = minuteCol.querySelectorAll('.item');
        let scroll = 0;
        for (let i = 0; i < 3; i++) {
          scroll += (items[i] as HTMLElement).offsetHeight;
        }
        minuteCol.scrollTop = scroll;
      }
    });
  }

  onScroll(event: any, type: 'hour' | 'minute') {
    const column = event.target as HTMLElement;
    const items = column.querySelectorAll('.item');
    const columnRect = column.getBoundingClientRect();
    const columnCenter = columnRect.top + columnRect.height / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    items.forEach((item: Element, i: number) => {
      const rect = item.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(center - columnCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = i;
      }
    });

    const isHour = type === 'hour';
    const rawArray = isHour ? this.rawHours : this.rawMinutes;
    const fullArray = isHour ? this.hours : this.minutes;
    const selectedKey = isHour ? 'selectedHourIndex' : 'selectedMinuteIndex';
    const postKey = isHour ? 'hourPost' : 'minutePost';

    this[selectedKey] = closestIndex;
    this[postKey] = fullArray[closestIndex] || '00';

    // Бесконечность
    if (closestIndex < 3) {
      const targetIndex = closestIndex + rawArray.length;
      let scrollTo = 0;
      for (let i = 0; i < targetIndex; i++) {
        scrollTo += (items[i] as HTMLElement).offsetHeight;
      }
      column.scrollTop = scrollTo;
      this[selectedKey] = targetIndex;
    } else if (closestIndex >= rawArray.length + 3) {
      const targetIndex = closestIndex - rawArray.length;
      let scrollTo = 0;
      for (let i = 0; i < targetIndex; i++) {
        scrollTo += (items[i] as HTMLElement).offsetHeight;
      }
      column.scrollTop = scrollTo;
      this[selectedKey] = targetIndex;
    }
  }

  savePost() {
    console.log(this.hourPost, this.minutePost);
  }

  deletePost() {}
}
