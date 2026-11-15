import { Routes } from '@angular/router';

import { VacationList } from './features/vacations/vacation-list/vacation-list';
import { VacationForm } from './features/vacations/vacation-form/vacation-form';

import { TimeOffList } from './features/time-off/time-off-list/time-off-list';
import { TimeOffForm } from './features/time-off/time-off-form/time-off-form';

export const routes: Routes = [
  {
    path: 'vacations',
    children: [
      {
        path: '',
        component: VacationList
      },
      {
        path: 'new',
        component: VacationForm
      }
    ]
  },
  {
    path: 'time-off',
    children: [
      {
        path: '',
        component: TimeOffList
      },
      {
        path: 'new',
        component: TimeOffForm
      }
    ]
  },
  {
    path: '',
    redirectTo: 'vacations',
    pathMatch: 'full'
  }
];
