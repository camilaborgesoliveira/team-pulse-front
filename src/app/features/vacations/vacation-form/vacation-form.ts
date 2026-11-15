import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router,
  RouterLink
} from '@angular/router';

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
        30
      ],

      additionalDays: [
        0,
        [
          Validators.min(0)
        ]
      ]

    });

  }

  ngOnInit(): void {

    this.vacationForm.valueChanges.subscribe(() => {

      this.errorMessage = '';

    });

  }

  selectVacationDays(days: number): void {

    this.vacationForm.patchValue({
      vacationDays: days
    });

  }

  get selectedVacationDays(): number {

    return Number(
      this.vacationForm.get('vacationDays')?.value ?? 0
    );

  }

  get additionalDays(): number {

    const value =
      this.vacationForm.get('additionalDays')?.value;

    return Number(value ?? 0);

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

    /*
     * Exemplo:
     *
     * Início: 05/11
     * 10 dias
     *
     * Último dia:
     * 14/11
     */

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

    /*
     * O retorno acontece
     * no dia seguinte ao último dia de férias.
     */

    date.setDate(
      date.getDate() + this.totalDays
    );

    return this.formatDateForDisplay(date);

  }

  private formatDateForDisplay(
    date: Date
  ): string {

    return date.toLocaleDateString(
      'pt-BR'
    );

  }

  save(): void {

    if (this.isLoading) {
      return;
    }

    this.errorMessage = '';

    /*
     * Pegamos os campos obrigatórios
     * diretamente para validar.
     */

    const employeeNameControl =
      this.vacationForm.get('employeeName');

    const startDateControl =
      this.vacationForm.get('startDate');

    /*
     * Validação do nome.
     */

    if (
      !employeeNameControl ||
      employeeNameControl.invalid
    ) {

      employeeNameControl?.markAsTouched();

      this.errorMessage =
        'Informe corretamente o nome do colaborador.';

      return;
    }

    /*
     * Validação da data.
     */

    if (
      !startDateControl ||
      startDateControl.invalid
    ) {

      startDateControl?.markAsTouched();

      this.errorMessage =
        'Informe a data de início das férias.';

      return;
    }

    /*
     * Validação dos dias.
     */

    if (this.selectedVacationDays <= 0) {

      this.errorMessage =
        'Selecione a quantidade de dias das férias.';

      return;
    }

    /*
     * Dias adicionais não podem
     * ser negativos.
     */

    if (this.additionalDays < 0) {

      this.errorMessage =
        'Os dias adicionais não podem ser negativos.';

      return;
    }

    /*
     * Segurança adicional.
     */

    if (this.totalDays <= 0) {

      this.errorMessage =
        'A quantidade total de dias deve ser maior que zero.';

      return;
    }

    this.isLoading = true;

    const formValue =
      this.vacationForm.getRawValue();

    /*
     * O backend recebe:
     *
     * employeeName
     * startDate
     * vacationDays
     *
     * Enviamos vacationDays com o total:
     *
     * período escolhido
     * +
     * dias adicionais
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

        finalize(() => {

          this.isLoading = false;

        })

      )
      .subscribe({

        next: (
          response: VacationResponse
        ) => {

          console.log(
            'Férias cadastradas com sucesso:',
            response
          );

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

  hasError(
    controlName: string
  ): boolean {

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
