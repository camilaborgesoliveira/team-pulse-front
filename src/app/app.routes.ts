import { Routes } from '@angular/router';

import { VacationList } from './features/vacations/vacation-list/vacation-list';
import { VacationForm } from './features/vacations/vacation-form/vacation-form';

import { TimeOffList } from './features/time-off/time-off-list/time-off-list';
import { TimeOffForm } from './features/time-off/time-off-form/time-off-form';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'vacations',
    pathMatch: 'full'
  },

  // =========================
  // VACATIONS
  // =========================

  {
    path: 'vacations',
    component: VacationList
  },

  {
    path: 'vacations/new',
    component: VacationForm
  },

  // =========================
  // TIME OFF
  // =========================

  {
    path: 'time-off',
    component: TimeOffList
  },

  {
    path: 'time-off/new',
    component: TimeOffForm
  },

  // =========================
  // FALLBACK
  // =========================

  {
    path: '**',
    redirectTo: 'vacations'
  }

];
