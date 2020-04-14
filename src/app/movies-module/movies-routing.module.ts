import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListComponent } from './containers/list/list.component';
import { MoviesComponent } from './containers/movies/movies.component';
import { ROUTES_STRINGS } from '../constants/routing';

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    children: [
      {
        path: ROUTES_STRINGS.LIST,
        component: ListComponent
      },
      {
        path: '**',
        redirectTo:  ROUTES_STRINGS.LIST
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule {}
