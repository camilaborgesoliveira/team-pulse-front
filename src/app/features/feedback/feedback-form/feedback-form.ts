import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { FeedbackService } from '../feedback.service';
import { Feedback } from '../feedback';

@Component({
  selector: 'app-feedback-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './feedback-form.html',
  styleUrl: './feedback-form.css'
})
export class FeedbackForm {

  feedback: Feedback = {
    employeeId: 0,
    employeeName: '',
    feedbackDate: '',
    positivePoints: '',
    improvementPoints: '',
    discussionNotes: '',
    nextFeedbackNotes: '',
    score: 0
  };

  isSaving = false;

  errorMessage = '';

  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly router: Router
  ) {
  }

  saveFeedback(): void {

    if (this.isSaving) {
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    if (!this.feedback.feedbackDate) {

      this.feedback.feedbackDate =
        new Date().toISOString().split('T')[0];

    }

    console.log(
      'INICIANDO SALVAMENTO:',
      this.feedback
    );

    this.feedbackService
      .createFeedback(this.feedback)
      .subscribe({

        next: (savedFeedback: Feedback) => {

          console.log(
            'FEEDBACK SALVO COM SUCESSO:',
            savedFeedback
          );

          this.isSaving = false;

          this.router
            .navigateByUrl('/feedback')
            .then(() => {

              console.log(
                'NAVEGAÇÃO PARA A LISTA REALIZADA'
              );

            });

        },

        error: (error: unknown) => {

          console.error(
            'ERRO AO SALVAR FEEDBACK:',
            error
          );

          this.errorMessage =
            'Não foi possível salvar o feedback.';

          this.isSaving = false;

        }

      });

  }

  cancel(): void {

    this.router.navigateByUrl('/feedback');

  }

}
