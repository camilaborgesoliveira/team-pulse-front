import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { finalize } from 'rxjs';

import { TimeOffService } from '../../../core/services/time-off.service';


@Component({
  selector: 'app-time-off-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './time-off-list.html',
  styleUrl: './time-off-list.css'
})
export class TimeOffList implements OnInit {

  timeOffs: any[] = [];

  notifications: string[] = [];

  isLoading = false;

  errorMessage = '';


  constructor(
    private readonly timeOffService: TimeOffService,
    private readonly router: Router,
    private readonly changeDetector: ChangeDetectorRef
  ) {
  }


  ngOnInit(): void {

    console.log('TIME OFF LIST INICIALIZADO');

    this.loadTimeOffs();

  }


  loadTimeOffs(): void {

    console.log('Carregando folgas...');

    this.isLoading = true;

    this.errorMessage = '';

    this.changeDetector.detectChanges();


    this.timeOffService
      .getAllTimeOffs()
      .pipe(

        finalize(() => {

          console.log(
            'REQUISIÇÃO DE FOLGAS FINALIZADA'
          );

          this.isLoading = false;

          console.log(
            'isLoading:',
            this.isLoading
          );

          this.changeDetector.detectChanges();

        })

      )
      .subscribe({

        next: (response: any[]) => {

          console.log(
            'Folgas recebidas da API:',
            response
          );


          this.timeOffs = response || [];


          console.log(
            'Folgas exibidas na lista:',
            this.timeOffs
          );


          this.generateNotifications();


          this.isLoading = false;


          this.changeDetector.detectChanges();

        },


        error: (error) => {

          console.error(
            'Erro ao carregar folgas:',
            error
          );


          this.errorMessage =
            'Não foi possível carregar as folgas.';


          this.timeOffs = [];


          this.notifications = [];


          this.isLoading = false;


          this.changeDetector.detectChanges();

        }

      });

  }


  generateNotifications(): void {

    this.notifications = [];


    const today =
      this.getToday();


    const tomorrow =
      this.getTomorrow();


    this.timeOffs.forEach((timeOff: any) => {

      const startDate =
        this.normalizeDate(
          timeOff.startDate
        );


      const returnDate =
        this.normalizeDate(
          timeOff.returnDate
        );


      /*
       * COLABORADOR RETORNA HOJE
       */

      if (returnDate === today) {

        this.notifications.push(
          `${timeOff.employeeName} retorna hoje.`
        );

      }


      /*
       * COLABORADOR INICIA A FOLGA AMANHÃ
       */

      if (startDate === tomorrow) {

        this.notifications.push(
          `${timeOff.employeeName} inicia a folga amanhã.`
        );

      }

    });


    console.log(
      'Notificações:',
      this.notifications
    );

  }


  goToNewTimeOff(): void {

    this.router.navigate([
      '/time-off/new'
    ]);

  }


  formatDate(date: string): string {

    if (!date) {

      return '';

    }


    const normalizedDate =
      this.normalizeDate(date);


    const parts =
      normalizedDate.split('-');


    if (parts.length !== 3) {

      return date;

    }


    const year =
      parts[0];


    const month =
      parts[1];


    const day =
      parts[2];


    return `${day}/${month}/${year}`;

  }


  private getToday(): string {

    const date =
      new Date();


    return this.formatDateForComparison(
      date
    );

  }


  private getTomorrow(): string {

    const date =
      new Date();


    date.setDate(
      date.getDate() + 1
    );


    return this.formatDateForComparison(
      date
    );

  }


  private formatDateForComparison(
    date: Date
  ): string {

    const year =
      date.getFullYear();


    const month =
      String(
        date.getMonth() + 1
      ).padStart(
        2,
        '0'
      );


    const day =
      String(
        date.getDate()
      ).padStart(
        2,
        '0'
      );


    return `${year}-${month}-${day}`;

  }


  private normalizeDate(
    date: string
  ): string {

    if (!date) {

      return '';

    }


    return date.substring(
      0,
      10
    );

  }

}
