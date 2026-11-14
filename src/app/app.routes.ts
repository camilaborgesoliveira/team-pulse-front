import { Routes } from '@angular/router';

import { VacationList } from './features/vacations/vacation-list/vacation-list';

export const routes: Routes = [
  {
    path: 'vacations',
    component: VacationList
  }
];
