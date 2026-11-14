import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vacation-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './vacation-form.html',
  styleUrl: './vacation-form.css'
})
export class VacationForm {

  employeeName = '';

  startDate = '';

  endDate = '';

  returnDate = '';

  saveVacation(): void {

    const vacation = {
      employeeName: this.employeeName,
      startDate: this.startDate,
      endDate: this.endDate,
      returnDate: this.returnDate
    };

    console.log('Férias cadastradas:', vacation);

    this.clearForm();
  }

  clearForm(): void {
    this.employeeName = '';
    this.startDate = '';
    this.endDate = '';
    this.returnDate = '';
  }

}
