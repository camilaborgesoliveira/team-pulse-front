import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vacation-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vacation-form.html',
  styleUrl: './vacation-form.css'
})
export class VacationForm {

  employeeName = '';

  startDate = '';

  vacationDays = 15;

  finalDate = '';

  returnDate = '';


  selectDays(days: number): void {
    this.vacationDays = days;
    this.calculateDates();
  }


  calculateDates(): void {

    if (!this.startDate || !this.vacationDays || this.vacationDays <= 0) {
      this.finalDate = '';
      this.returnDate = '';
      return;
    }

    const parts = this.startDate.split('-');

    const year = Number(parts[0]);
    const month = Number(parts[1]) - 1;
    const day = Number(parts[2]);

    const start = new Date(year, month, day);

    const final = new Date(start);

    // O primeiro dia das férias conta como dia 1
    final.setDate(start.getDate() + this.vacationDays - 1);

    const returnToWork = new Date(final);

    // Retorna no dia seguinte ao último dia de férias
    returnToWork.setDate(final.getDate() + 1);

    this.finalDate = this.formatDate(final);
    this.returnDate = this.formatDate(returnToWork);
  }


  private formatDate(date: Date): string {

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }


  saveVacation(): void {

    this.calculateDates();

    if (!this.employeeName || !this.startDate || this.vacationDays <= 0) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    console.log({
      employeeName: this.employeeName,
      startDate: this.startDate,
      vacationDays: this.vacationDays,
      finalDate: this.finalDate,
      returnDate: this.returnDate
    });

    alert('Férias registradas com sucesso!');
  }
}
