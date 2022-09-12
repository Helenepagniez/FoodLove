import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FormEssaiComponent } from './form-essai/form-essai.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProfilComponent } from './profil/profil.component';
import { RecetteFormComponent } from './recette-form/recette-form.component';
import { RecetteListComponent } from './recette-list/recette-list.component';
import { SingleRecetteComponent } from './single-recette/single-recette.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: HeaderComponent },
  { path: 'home', component: HomeComponent },
  { path: 'liste', component: RecetteListComponent },
  //{ path: 'recette/:id', component: SingleRecetteComponent},
  { path: 'profil', component: ProfilComponent },
  { path: 'recette/:id', component: FormEssaiComponent },
  { path: 'new-recette', component: RecetteFormComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
