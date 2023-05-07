import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProfilComponent } from './profil/profil.component';
import { RecetteFormComponent } from './recette-form/recette-form.component';
import { RecetteListComponent } from './recette-list/recette-list.component';
import { EtapesComponent } from './single-recette/etapes/etapes.component';
import { ComposantsComponent } from './single-recette/composants/composants.component';
import { SingleRecetteComponent } from './single-recette/single-recette.component';
import { PersonnaliserComponent } from './single-recette/composants/personnaliser/personnaliser.component';
import { ConnectComponent } from './auth/connect/connect.component';

const routes: Routes = [
  { path: 'connect', component: ConnectComponent },
  { path: 'logout', component: HeaderComponent },
  { path: 'home', component: HomeComponent },
  { path: 'liste', component: RecetteListComponent },
  { path: 'recette/:id', component: SingleRecetteComponent},
  { path: 'recette/:id/ingredients', component: ComposantsComponent},
  { path: 'personnalisation-ingredient', component: PersonnaliserComponent},
  { path: 'recette/:id/etapes', component: EtapesComponent},
  { path: 'profil', component: ProfilComponent },
  { path: 'new-recette', component: RecetteFormComponent },
  { path: '', pathMatch: 'full', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
