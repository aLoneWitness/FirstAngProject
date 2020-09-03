import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {AuthenticatedGuard} from './_guards/authenticated.guard';
import {ProfileComponent} from './profile/profile.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthenticatedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
