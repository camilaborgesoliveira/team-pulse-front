import { Routes } from '@angular/router';

import { VacationList } from './features/vacations/vacation-list/vacation-list';
import { VacationForm } from './features/vacations/vacation-form/vacation-form';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'vacations',
    pathMatch: 'full'
  },

  {
    path: 'vacations',
    component: VacationList
  },

  {
    path: 'vacations/new',
    component: VacationForm
  },

  {
    path: '**',
    redirectTo: 'vacations'
  }

];
