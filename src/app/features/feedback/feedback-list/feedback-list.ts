import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { FeedbackService } from '../feedback.service';
import { Feedback } from '../feedback';

@Component({
  selector: 'app-feedback-list',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './feedback-list.html',
  styleUrl: './feedback-list.css'
})
export class FeedbackList implements OnInit {

  feedbacks: Feedback[] = [];

  isLoading = true;

  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly router: Router,
    private readonly changeDetector: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {

    console.log('FEEDBACK LIST INICIALIZADO');

    this.loadFeedbacks();

  }

  loadFeedbacks(): void {

    console.log('CARREGANDO FEEDBACKS...');

    this.isLoading = true;

    this.feedbackService
      .getAllFeedbacks()
      .subscribe({

        next: (feedbacks: Feedback[]) => {

          console.log(
            'FEEDBACKS RECEBIDOS DA API:',
            feedbacks
          );

          console.log(
            'QUANTIDADE:',
            feedbacks.length
          );

          this.feedbacks = feedbacks;

          this.isLoading = false;

          this.changeDetector.detectChanges();

          console.log(
            'IS LOADING:',
            this.isLoading
          );

        },

        error: (error: unknown) => {

          console.error(
            'ERRO AO CARREGAR FEEDBACKS:',
            error
          );

          this.isLoading = false;

          this.changeDetector.detectChanges();

        }

      });

  }

  newFeedback(): void {

    this.router.navigate([
      '/feedback/new'
    ]);

  }

  viewHistory(employeeName: string): void {

    this.router.navigate([
      '/feedback/history',
      employeeName
    ]);

  }

}
