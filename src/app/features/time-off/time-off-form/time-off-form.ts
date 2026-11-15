import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import {
  TimeOffRequest,
  TimeOffService
} from '../../../core/services/time-off.service';

@Component({
  selector: 'app-time-off-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './time-off-form.html',
  styleUrl: './time-off-form.css'
})
export class TimeOffForm {

  employeeName = '';
  startDate = '';
  days = 1;

  endDate = '';
  returnDate = '';

  isLoading = false;
  errorMessage = '';

  constructor(
    private timeOffService: TimeOffService,
    private router: Router
  ) {
  }

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

    const start = new Date(
      `${this.startDate}T12:00:00`
    );

    const end = new Date(start);

    end.setDate(
      start.getDate() + this.days - 1
    );

    const returnDate = new Date(end);

    returnDate.setDate(
      end.getDate() + 1
    );

    this.endDate = this.formatDate(end);
    this.returnDate = this.formatDate(returnDate);
  }

  formatDate(date: Date): string {

    return date.toLocaleDateString('pt-BR');
  }

  saveTimeOff(): void {

    if (this.isLoading) {
      return;
    }

    this.errorMessage = '';

    if (
      !this.employeeName.trim() ||
      !this.startDate ||
      !this.days ||
      this.days < 1
    ) {

      this.errorMessage =
        'Preencha todos os campos corretamente.';

      return;
    }

    this.isLoading = true;

    const request: TimeOffRequest = {
      employeeName: this.employeeName.trim(),
      startDate: this.startDate,
      days: Number(this.days)
    };

    console.log(
      'Enviando folga:',
      request
    );

    this.timeOffService
      .createTimeOff(request)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Folga cadastrada com sucesso:',
            response
          );

          this.router.navigate([
            '/time-off'
          ]);
        },

        error: (error) => {

          console.error(
            'Erro ao cadastrar folga:',
            error
          );

          this.errorMessage =
            'Não foi possível cadastrar a folga. Tente novamente.';
        }

      });
  }

  cancel(): void {

    if (this.isLoading) {
      return;
    }

    this.router.navigate([
      '/time-off'
    ]);
  }
}
