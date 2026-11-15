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
      startDate: '20/11/2026',
      days: 30,
      endDate: '19/12/2026',
      returnDate: '20/12/2026'
    },
    {
      employeeName: 'Maria Oliveira',
      startDate: '25/11/2026',
      days: 15,
      endDate: '09/12/2026',
      returnDate: '10/12/2026'
    }
  ];

}
