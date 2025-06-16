import {  Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { MyQuotesComponent } from './components/my-quotes/my-quotes.component';
import { LoginComponent } from './components/login/login.component';
import { MainViewComponent } from './components/main-view/main-view.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainViewComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'homepage', pathMatch: 'full' },
      { path: 'homepage', component: HomepageComponent },
      { path: 'my-quotes', component: MyQuotesComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' }
];

