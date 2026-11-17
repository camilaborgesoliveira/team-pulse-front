import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { FeedbackService } from '../feedback.service';
import { Feedback } from '../feedback';

@Component({
  selector: 'app-feedback-history',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './feedback-history.html',
  styleUrl: './feedback-history.css'
})
export class FeedbackHistory implements OnInit {

  employeeName = '';

  feedbacks: Feedback[] = [];

  isLoading = true;

  errorMessage = '';

  constructor(
    private readonly feedbackService: FeedbackService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
  ) {
  }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(
      (params) => {

        this.employeeName =
          decodeURIComponent(params['employeeName']);

        this.loadFeedbackHistory();

      }
    );

  }

  loadFeedbackHistory(): void {

    this.isLoading = true;

    this.errorMessage = '';

    this.feedbackService
      .getAllFeedbacks()
      .subscribe({

        next: (feedbacks: Feedback[]) => {

          this.feedbacks = feedbacks
            .filter(
              (feedback) =>
                feedback.employeeName
                  .toLowerCase()
                  .trim() ===
                this.employeeName
                  .toLowerCase()
                  .trim()
            )
            .sort(
              (first, second) =>
                new Date(second.feedbackDate).getTime() -
                new Date(first.feedbackDate).getTime()
            );

          this.isLoading = false;

        },

        error: (error: unknown) => {

          console.error(
            'Erro ao carregar histórico:',
            error
          );

          this.errorMessage =
            'Não foi possível carregar o histórico do colaborador.';

          this.isLoading = false;

        }

      });

  }

  goBack(): void {

    this.router.navigate([
      '/feedback'
    ]);

  }

}
