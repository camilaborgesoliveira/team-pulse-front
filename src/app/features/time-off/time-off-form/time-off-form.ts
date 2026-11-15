import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-time-off-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './time-off-form.html',
  styleUrl: './time-off-form.css'
})
export class TimeOffForm {

  employeeName = '';
  startDate = '';
  days = 1;

  endDate = '';
  returnDate = '';

  selectDays(days: number): void {
    this.days = days;
    this.calculateDates();
  }

  calculateDates(): void {
    if (!this.startDate || !this.days || this.days < 1) {
      this.endDate = '';
      this.returnDate = '';
      return;
    }

    const start = new Date(`${this.startDate}T00:00:00`);

    const end = new Date(start);
    end.setDate(start.getDate() + this.days - 1);

    const returnDate = new Date(end);
    returnDate.setDate(end.getDate() + 1);

    this.endDate = this.formatDate(end);
    this.returnDate = this.formatDate(returnDate);
  }

  formatDate(date: Date): string {
    return date.toLocaleDateString('pt-BR');
  }

  saveTimeOff(): void {
    if (!this.employeeName || !this.startDate || this.days < 1) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    alert(
      `Folga cadastrada com sucesso!\n\n` +
      `Colaborador: ${this.employeeName}\n` +
      `Início: ${this.formatDate(
        new Date(`${this.startDate}T00:00:00`)
      )}\n` +
      `Quantidade de dias: ${this.days}\n` +
      `Final: ${this.endDate}\n` +
      `Retorno: ${this.returnDate}`
    );
  }
}
