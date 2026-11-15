import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';

import {
  VacationRequest,
  VacationResponse,
  VacationService
} from '../../../core/services/vacation.service';

@Component({
  selector: 'app-vacation-form',
  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],

  templateUrl: './vacation-form.html',
  styleUrl: './vacation-form.css'
})
export class VacationForm implements OnInit {

  vacationForm: FormGroup;

  vacationOptions = [10, 15, 20, 30];

  isLoading = false;

  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private vacationService: VacationService,
    private router: Router
  ) {

    this.vacationForm = this.formBuilder.group({
      employeeName: [
        '',
        [
          Validators.required,
          Validators.minLength(3)
        ]
      ],

      startDate: [
        '',
        Validators.required
      ],

      vacationDays: [
        30,
        Validators.required
      ],

      additionalDays: [
        0,
        [
          Validators.required,
          Validators.min(0)
        ]
      ]
    });
  }

  ngOnInit(): void {

    this.vacationForm.valueChanges.subscribe(() => {
      // Atualiza automaticamente o resumo das férias
    });

  }

  selectVacationDays(days: number): void {

    this.vacationForm.patchValue({
      vacationDays: days
    });

  }

  get selectedVacationDays(): number {

    return Number(
      this.vacationForm.get('vacationDays')?.value || 0
    );

  }

  get additionalDays(): number {

    return Number(
      this.vacationForm.get('additionalDays')?.value || 0
    );

  }

  get totalDays(): number {

    return (
      this.selectedVacationDays +
      this.additionalDays
    );

  }

  get finalDate(): string {

    const startDate =
      this.vacationForm.get('startDate')?.value;

    if (!startDate || this.totalDays <= 0) {
      return '';
    }

    const date = new Date(
      `${startDate}T12:00:00`
    );

    date.setDate(
      date.getDate() + this.totalDays - 1
    );

    return this.formatDateForDisplay(date);

  }

  get returnDate(): string {

    const startDate =
      this.vacationForm.get('startDate')?.value;

    if (!startDate || this.totalDays <= 0) {
      return '';
    }

    const date = new Date(
      `${startDate}T12:00:00`
    );

    date.setDate(
      date.getDate() + this.totalDays
    );

    return this.formatDateForDisplay(date);

  }

  private formatDateForDisplay(date: Date): string {

    return date.toLocaleDateString(
      'pt-BR'
    );

  }

  save(): void {

    if (this.isLoading) {
      return;
    }

    this.errorMessage = '';

    if (this.vacationForm.invalid) {

      this.vacationForm.markAllAsTouched();

      this.errorMessage =
        'Preencha todos os campos obrigatórios corretamente.';

      return;
    }

    if (this.totalDays <= 0) {

      this.errorMessage =
        'A quantidade total de dias deve ser maior que zero.';

      return;
    }

    this.isLoading = true;

    const formValue =
      this.vacationForm.getRawValue();

    /*
     * O backend atual recebe apenas:
     *
     * employeeName
     * startDate
     * vacationDays
     *
     * Por isso enviamos o TOTAL:
     *
     * período escolhido + dias adicionais
     */
    const request: VacationRequest = {
      employeeName:
        formValue.employeeName.trim(),

      startDate:
      formValue.startDate,

      vacationDays:
      this.totalDays
    };

    console.log(
      'Enviando férias:',
      request
    );

    this.vacationService
      .createVacation(request)
      .pipe(

        /*
         * Sempre encerra o loading,
         * seja sucesso ou erro.
         */
        finalize(() => {
          this.isLoading = false;
        })

      )
      .subscribe({

        next: (response: VacationResponse) => {

          console.log(
            'Férias cadastradas com sucesso:',
            response
          );

          /*
           * Redireciona para a lista.
           *
           * Quando VacationList for iniciado,
           * ele executará loadVacations().
           */
          this.router.navigate([
            '/vacations'
          ]);

        },

        error: (error) => {

          console.error(
            'Erro ao cadastrar férias:',
            error
          );

          this.errorMessage =
            'Não foi possível cadastrar as férias. Tente novamente.';
        }

      });

  }

  cancel(): void {

    if (this.isLoading) {
      return;
    }

    this.router.navigate([
      '/vacations'
    ]);

  }

  hasError(controlName: string): boolean {

    const control =
      this.vacationForm.get(controlName);

    return !!(
      control &&
      control.invalid &&
      control.touched
    );

  }

  get employeeName() {

    return this.vacationForm.get(
      'employeeName'
    );

  }

  get startDate() {

    return this.vacationForm.get(
      'startDate'
    );

  }

}
