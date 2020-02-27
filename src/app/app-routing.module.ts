import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guard';

import { DefaultComponent } from './modules/default/default.component';


const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
  },
  {
    path: 'login',
    loadChildren: './modules/login/login.module#LoginModule',
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: './modules/home/home.module#HomeModule',
  },
  {
    path: '**',
    redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
