import { Component } from '@angular/core';
import { Title } from '../../components/title/title';
import { Description } from '../../components/description/description';
import { FormsModule } from '@angular/forms';
import { Button } from '../../components/button/button';

@Component({
  selector: 'app-new-schedule',
  imports: [Title, Description, FormsModule, Button],
  templateUrl: './new-schedule.html',
  styleUrl: './new-schedule.scss',
})
export class NewSchedule {
  namePost: string | null = null;

  savePost() {}

  deletePost() {}
}
