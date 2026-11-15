import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import {
  VacationResponse,
  VacationService
} from '../../../core/services/vacation.service';

@Component({
  selector: 'app-vacation-list',
  standalone: true,

  imports: [
    CommonModule,
    RouterLink
  ],

  templateUrl: './vacation-list.html',
  styleUrl: './vacation-list.css'
})
export class VacationList implements OnInit {

  vacations: VacationResponse[] = [];

  isLoading = true;

  errorMessage = '';

  constructor(
    private vacationService: VacationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    console.log('VACATION LIST INICIALIZADO');

    this.loadVacations();
  }

  loadVacations(): void {

    console.log('LOAD VACATIONS CHAMADO');

    this.isLoading = true;

    this.errorMessage = '';

    this.vacationService
      .getVacations()
      .subscribe({

        next: (data: VacationResponse[]) => {

          console.log('Férias carregadas:', data);

          this.vacations = [...data];

          console.log(
            'Quantidade de registros:',
            this.vacations.length
          );

          this.isLoading = false;

          // Força a atualização da interface
          this.cdr.detectChanges();

          console.log(
            'Loading finalizado:',
            this.isLoading
          );
        },

        error: (error) => {

          console.error(
            'Erro ao carregar férias:',
            error
          );

          this.vacations = [];

          this.errorMessage =
            'Não foi possível carregar as férias.';

          this.isLoading = false;

          // Força a atualização da interface
          this.cdr.detectChanges();
        }

      });
  }

  formatDate(date: string): string {

    if (!date) {
      return '';
    }

    const [year, month, day] =
      date.split('-');

    return `${day}/${month}/${year}`;
  }

  getInitials(name: string): string {

    if (!name) {
      return '';
    }

    return name
      .split(' ')
      .filter(part => part.length > 0)
      .slice(0, 2)
      .map(part => part[0])
      .join('')
      .toUpperCase();
  }

}
