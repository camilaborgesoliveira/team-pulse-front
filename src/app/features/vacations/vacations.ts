import { Component } from '@angular/core';

import { VacationForm } from './vacation-form/vacation-form';
import { VacationList } from './vacation-list/vacation-list';

@Component({
  selector: 'app-vacations',
  standalone: true,
  imports: [
    VacationForm,
    VacationList
  ],
  templateUrl: './vacations.html',
  styleUrl: './vacations.css'
})
export class Vacations {

}
