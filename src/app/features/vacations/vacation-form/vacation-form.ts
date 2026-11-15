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

    const start = new Date(`${this.startDate}T00:00:00`);

    const final = new Date(start);
    final.setDate(start.getDate() + this.vacationDays - 1);

    const returnToWork = new Date(final);
    returnToWork.setDate(final.getDate() + 1);

    this.finalDate = this.formatDate(final);
    this.returnDate = this.formatDate(returnToWork);
  }

  private formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR');
  }

  saveVacation(): void {
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
