import {  Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MyQuotesComponent } from './components/my-quotes/my-quotes.component';
import { LoginComponent } from './components/login/login.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { authGuard } from '../app/guards/auth.guard';
import { loginGuard } from '../app/guards/login.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainViewComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'homepage', pathMatch: 'full' },
      { path: 'homepage', component: HomepageComponent, runGuardsAndResolvers: 'always' },
      { path: 'my-quotes', component: MyQuotesComponent, runGuardsAndResolvers: 'always' }
    ]
  },
  { path: 'login', component: LoginComponent, canActivate: [loginGuard]},
  { path: '**', redirectTo: 'login' }
];

