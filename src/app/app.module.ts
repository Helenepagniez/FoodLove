import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RecetteListComponent } from './recette-list/recette-list.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './header/header.component';
import { SingleRecetteComponent } from './single-recette/single-recette.component';
import { ProfilComponent } from './profil/profil.component';
import { MatChipsModule } from '@angular/material/chips';
import { RecetteFormComponent } from './recette-form/recette-form.component';
import {MatSelectModule} from '@angular/material/select';
import { ComposantsComponent } from './single-recette/composants/composants.component';
import { EtapesComponent } from './single-recette/etapes/etapes.component';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    RecetteListComponent,
    DialogComponent,
    HeaderComponent,
    SingleRecetteComponent,
    ProfilComponent,
    RecetteFormComponent,
    ComposantsComponent,
    EtapesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule,
    MatSelectModule,
    CommonModule,
    MatExpansionModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
