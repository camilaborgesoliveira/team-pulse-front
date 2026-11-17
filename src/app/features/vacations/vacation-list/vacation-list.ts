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

          console.log(
            'Férias carregadas:',
            data
          );


          /*
           * Mantém apenas os registros cujo
           * retorno ainda é hoje ou futuro.
           *
           * Retorno hoje:
           * continua aparecendo.
           *
           * A partir do dia seguinte:
           * desaparece da lista.
           */
          this.vacations = data.filter(
            vacation =>
              this.shouldDisplayVacation(vacation)
          );


          console.log(
            'Quantidade de registros exibidos:',
            this.vacations.length
          );


          this.isLoading = false;

          this.cdr.detectChanges();
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

          this.cdr.detectChanges();
        }

      });
  }


  /*
   * Define se as férias devem
   * aparecer na lista.
   */
  shouldDisplayVacation(
    vacation: VacationResponse
  ): boolean {

    const today = this.getToday();

    const returnDate = this.parseDate(
      vacation.returnDate
    );

    /*
     * Se o retorno for hoje,
     * a data será igual.
     *
     * Se o retorno for futuro,
     * será maior.
     *
     * Apenas retornos anteriores
     * ao dia atual são removidos.
     */
    return returnDate.getTime() >= today.getTime();
  }


  /*
   * Formata YYYY-MM-DD
   * para DD/MM/YYYY.
   */
  formatDate(
    date: string
  ): string {

    if (!date) {
      return '';
    }

    const [
      year,
      month,
      day
    ] = date.split('-');

    return `${day}/${month}/${year}`;
  }


  /*
   * Retorna as iniciais
   * do colaborador.
   */
  getInitials(
    name: string
  ): string {

    if (!name) {
      return '';
    }

    return name
      .split(' ')
      .filter(
        part => part.length > 0
      )
      .slice(0, 2)
      .map(
        part => part[0]
      )
      .join('')
      .toUpperCase();
  }


  /*
   * Verifica se as férias
   * começam hoje, amanhã
   * ou daqui a 2 dias.
   */
  isVacationStartingSoon(
    vacation: VacationResponse
  ): boolean {

    const today = this.getToday();

    const startDate = this.parseDate(
      vacation.startDate
    );

    const difference =
      this.getDifferenceInDays(
        today,
        startDate
      );

    return difference >= 0
      && difference <= 2;
  }


  /*
   * Verifica se o retorno
   * acontece hoje ou amanhã.
   */
  isReturningSoon(
    vacation: VacationResponse
  ): boolean {

    const today = this.getToday();

    const returnDate = this.parseDate(
      vacation.returnDate
    );

    const difference =
      this.getDifferenceInDays(
        today,
        returnDate
      );

    return difference >= 0
      && difference <= 1;
  }


  /*
   * Verifica especificamente
   * se a pessoa retorna HOJE.
   *
   * Este método é necessário
   * porque o HTML está chamando:
   *
   * isReturningToday(vacation)
   */
  isReturningToday(
    vacation: VacationResponse
  ): boolean {

    const today = this.getToday();

    const returnDate = this.parseDate(
      vacation.returnDate
    );

    return returnDate.getTime()
      === today.getTime();
  }


  /*
   * Retorna todas as férias
   * que precisam gerar alertas.
   */
  getVacationAlerts(): VacationResponse[] {

    return this.vacations.filter(
      vacation =>
        this.isVacationStartingSoon(vacation)
        || this.isReturningSoon(vacation)
    );
  }


  /*
   * Define a mensagem
   * do alerta.
   */
  getAlertMessage(
    vacation: VacationResponse
  ): string {

    /*
     * Primeiro verificamos
     * o retorno.
     *
     * Isso garante que,
     * se retornar hoje,
     * a informação seja:
     *
     * "Nome retorna hoje."
     */
    if (this.isReturningSoon(vacation)) {

      const today = this.getToday();

      const returnDate = this.parseDate(
        vacation.returnDate
      );

      const difference =
        this.getDifferenceInDays(
          today,
          returnDate
        );


      if (difference === 0) {

        return `${vacation.employeeName} retorna hoje.`;
      }


      if (difference === 1) {

        return `${vacation.employeeName} retorna amanhã.`;
      }
    }


    /*
     * Verifica início das férias.
     */
    if (this.isVacationStartingSoon(vacation)) {

      const today = this.getToday();

      const startDate = this.parseDate(
        vacation.startDate
      );

      const difference =
        this.getDifferenceInDays(
          today,
          startDate
        );


      if (difference === 0) {

        return `${vacation.employeeName} inicia as férias hoje.`;
      }


      if (difference === 1) {

        return `${vacation.employeeName} inicia as férias amanhã.`;
      }


      if (difference === 2) {

        return `${vacation.employeeName} inicia as férias em 2 dias.`;
      }
    }


    return '';
  }


  /*
   * Retorna a data atual
   * com horário zerado.
   */
  private getToday(): Date {

    const today = new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );

    return today;
  }


  /*
   * Converte uma string
   * YYYY-MM-DD para Date.
   *
   * Exemplo:
   *
   * 15/11/2026
   */
  private parseDate(
    date: string
  ): Date {

    const [
      year,
      month,
      day
    ] = date
      .split('-')
      .map(Number);

    return new Date(
      year,
      month - 1,
      day
    );
  }


  /*
   * Calcula a diferença
   * entre duas datas em dias.
   */
  private getDifferenceInDays(
    startDate: Date,
    endDate: Date
  ): number {

    const millisecondsPerDay =
      1000 * 60 * 60 * 24;

    const difference =
      endDate.getTime()
      - startDate.getTime();

    return Math.round(
      difference / millisecondsPerDay
    );
  }

}
