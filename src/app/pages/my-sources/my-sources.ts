import { Component, OnInit } from '@angular/core';
import { Title } from '../../components/title/title';
import { Description } from '../../components/description/description';
import { CommonModule } from '@angular/common';
import { Button } from '../../components/button/button';
import { ChannelSelection } from '../../components/channel-selection/channel-selection';
import { Channel, ChannelSource } from '../../models/channel.model';
import { ChannelService } from '../../services/channel.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-sources',
  imports: [Title, CommonModule, Button, ChannelSelection, FormsModule],
  templateUrl: './my-sources.html',
  styleUrl: './my-sources.scss',
})
export class MySources implements OnInit {
  channels: Channel[] = [];
  selectedChannelId: number | null = null;
  selectedChannelSources: ChannelSource[] = [];
  openedEditorIndex: number | null = null;
  editedSource: ChannelSource | null = null;
  isAddingNewSource: boolean = false;

  newSource: ChannelSource = {
    name: '',
    link: '',
    photo: '../../../assets/mock/default-source.png', // или другой placeholder
  };

  constructor(private channelService: ChannelService) {}

  ngOnInit(): void {
    this.channelService.getChannels().subscribe((data) => {
      this.channels = data;
    });
  }

  onChannelSelected(channelId: number) {
    this.selectedChannelId = channelId;
    this.channelService.getChannelSources(channelId).subscribe((sources) => {
      this.selectedChannelSources = sources;
    });
  }

  onToggleEditor(index: number): void {
    if (this.openedEditorIndex === index) {
      this.openedEditorIndex = null;
      this.editedSource = null;
    } else {
      this.openedEditorIndex = index;
      // создаем копию объекта для редактирования
      this.editedSource = { ...this.selectedChannelSources[index] };
    }
  }

  showNewSourceForm(): void {
    this.isAddingNewSource = true;
  }

  saveSource(): void {
    if (
      this.openedEditorIndex !== null &&
      this.editedSource &&
      this.selectedChannelId !== null
    ) {
      this.selectedChannelSources[this.openedEditorIndex] = {
        ...this.editedSource,
      };

      this.channelService
        .updateChannelSources(
          this.selectedChannelId,
          this.selectedChannelSources
        )
        .subscribe({
          next: () => {
            console.log('Источники обновлены успешно!');
          },
          error: (err) => {
            console.error('Ошибка при обновлении источников:', err);
          },
        });

      this.editedSource = null;
      this.openedEditorIndex = null;
    }
  }

  deleteSource(index: number): void {
    if (this.selectedChannelId !== null) {
      this.selectedChannelSources.splice(index, 1);

      this.channelService
        .updateChannelSources(
          this.selectedChannelId,
          this.selectedChannelSources
        )
        .subscribe({
          next: () => {
            console.log('Источник удалён успешно');
          },
          error: (err) => {
            console.error('Ошибка при удалении источника:', err);
          },
        });

      this.editedSource = null;
      this.openedEditorIndex = null;
    }
  }

  addNewSource(): void {
    this.isAddingNewSource = false;
    if (this.selectedChannelId !== null && this.newSource.link) {
      this.channelService.fetchSourceInfo(this.newSource.link).subscribe({
        next: (fetchedSource) => {
          this.selectedChannelSources.push(fetchedSource);

          this.channelService
            .updateChannelSources(
              this.selectedChannelId!,
              this.selectedChannelSources
            )
            .subscribe({
              next: () => console.log('Источник добавлен'),
              error: (err) => console.error('Ошибка при сохранении:', err),
            });

          this.newSource.link = '';
          this.isAddingNewSource = false;
        },
        error: (err) => {
          console.error('Ошибка при получении информации по ссылке:', err);
        },
      });
    }
  }
}
