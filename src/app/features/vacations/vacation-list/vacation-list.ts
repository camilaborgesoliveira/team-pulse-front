import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vacation-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vacation-list.html',
  styleUrl: './vacation-list.css'
})
export class VacationList {

  vacations = [
    {
      employeeName: 'João Silva',
      startDate: '2026-11-20',
      endDate: '2026-12-19'
    },
    {
      employeeName: 'Maria Oliveira',
      startDate: '2026-11-25',
      endDate: '2026-12-24'
    }
  ];

}
