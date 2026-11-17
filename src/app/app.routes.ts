import { Routes } from '@angular/router';

import { VacationList } from './features/vacations/vacation-list/vacation-list';
import { VacationForm } from './features/vacations/vacation-form/vacation-form';

import { TimeOffList } from './features/time-off/time-off-list/time-off-list';
import { TimeOffForm } from './features/time-off/time-off-form/time-off-form';

import { FeedbackList } from './features/feedback/feedback-list/feedback-list';
import { FeedbackForm } from './features/feedback/feedback-form/feedback-form';
import { FeedbackHistory } from './features/feedback/feedback-history/feedback-history';

import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [

  // =========================
  // REDIRECT
  // =========================

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },


  // =========================
  // DASHBOARD
  // =========================

  {
    path: 'dashboard',
    component: Dashboard
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
  // FEEDBACK
  // =========================

  {
    path: 'feedback',
    component: FeedbackList
  },

  {
    path: 'feedback/new',
    component: FeedbackForm
  },

  {
    path: 'feedback/history/:employeeName',
    component: FeedbackHistory
  },


  // =========================
  // FALLBACK
  // =========================

  {
    path: '**',
    redirectTo: 'dashboard'
  }

];
