import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-time-off-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './time-off-list.html',
  styleUrl: './time-off-list.css'
})
export class TimeOffList {

  timeOffs = [
    {
      employee: 'João Silva',
      startDate: '20/11/2026',
      days: 2,
      endDate: '21/11/2026',
      returnDate: '22/11/2026'
    },
    {
      employee: 'Maria Oliveira',
      startDate: '25/11/2026',
      days: 3,
      endDate: '27/11/2026',
      returnDate: '28/11/2026'
    }
  ];
}
