import { AuthGuard } from './auth/auth.guard';
import { TrainingComponent } from './training/training.component';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: WelcomeComponent,canActivate:[AuthGuard]},
  {path: 'signup', component: SignUpComponent},
  {path: 'login', component: LoginComponent},
  {path: 'training', component: TrainingComponent,canActivate:[AuthGuard]},
  {path:'**',redirectTo:''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
