import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface VacationRequest {
  employeeName: string;
  startDate: string;
  vacationDays: number;
}

export interface VacationResponse {
  id: number;
  employeeName: string;
  startDate: string;
  vacationDays: number;
  finalDate: string;
  returnDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  private readonly apiUrl =
    'http://localhost:8080/api/vacations';

  constructor(
    private http: HttpClient
  ) {}

  getVacations(): Observable<VacationResponse[]> {

    console.log(
      'SERVICE: Buscando férias em:',
      this.apiUrl
    );

    return this.http.get<VacationResponse[]>(
      this.apiUrl
    );
  }

  createVacation(
    request: VacationRequest
  ): Observable<VacationResponse> {

    console.log(
      'SERVICE: Criando férias:',
      request
    );

    return this.http.post<VacationResponse>(
      this.apiUrl,
      request
    );
  }

}
