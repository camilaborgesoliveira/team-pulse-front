import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface TimeOffRequest {
  employeeName: string;
  startDate: string;
  days: number;
}

export interface TimeOffResponse {
  id: number;
  employeeName: string;
  startDate: string;
  days: number;
  finalDate: string;
  returnDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class TimeOffService {

  private readonly apiUrl =
    'http://localhost:8080/api/time-offs';

  constructor(
    private http: HttpClient
  ) {
  }

  createTimeOff(
    request: TimeOffRequest
  ): Observable<TimeOffResponse> {

    return this.http.post<TimeOffResponse>(
      this.apiUrl,
      request
    );
  }

  getAllTimeOffs(): Observable<TimeOffResponse[]> {

    return this.http.get<TimeOffResponse[]>(
      this.apiUrl
    );
  }
}
