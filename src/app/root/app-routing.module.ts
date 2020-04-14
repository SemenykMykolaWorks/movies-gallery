import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ROUTES_STRINGS } from '../constants/routing';
import { RegistryComponent } from './containers/registry/registry.component';
import { LoginComponent } from './containers/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { LogoutGuard } from './guards/logout.guard';

const routes: Routes = [
  {
    path: ROUTES_STRINGS.LOGIN,
    component: LoginComponent,
    canActivate: [LogoutGuard]
  },
  {
    path: ROUTES_STRINGS.REGISTER,
    component: RegistryComponent,
    canActivate: [LogoutGuard]
  },
  {
    path: '',
    canLoad: [LoginGuard],
    canActivate: [LoginGuard],
    loadChildren: () => import('../movies-module/movies.module').then(m => m.MoviesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  providers: [
    LoginGuard,
    LogoutGuard,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
