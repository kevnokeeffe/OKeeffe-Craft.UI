import { NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-selection-list',
  standalone: true,
  imports: [MatIconModule, MatListModule, NgStyle, MatDivider, MatMenuModule],
  templateUrl: './selection-list.component.html',
  styleUrl: './selection-list.component.scss',
})
export class SelectionListComponent {
  navigateToGithub() {
    window.open('https://github.com/kevnokeeffe', '_blank');
  }
}
