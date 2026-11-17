import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Feedback } from './feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private readonly apiUrl =
    'http://localhost:8080/api/feedbacks';

  constructor(
    private readonly http: HttpClient
  ) {
  }

  getAllFeedbacks(): Observable<Feedback[]> {

    return this.http.get<Feedback[]>(
      this.apiUrl
    );

  }

  getFeedbacksByEmployee(
    employeeId: number
  ): Observable<Feedback[]> {

    return this.http.get<Feedback[]>(
      `${this.apiUrl}/employee/${employeeId}`
    );

  }

  createFeedback(
    feedback: Feedback
  ): Observable<Feedback> {

    console.log(
      'Enviando requisição POST para:',
      this.apiUrl
    );

    console.log(
      'Dados enviados:',
      feedback
    );

    return this.http.post<Feedback>(
      this.apiUrl,
      feedback
    );

  }

}
