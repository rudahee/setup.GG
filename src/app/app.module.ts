import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/*
* COMPONENTES, SERVICIOS y ROUTING
*/
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SetupService } from 'src/app/services/setup/setup.service';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';

/*
* FIREBASE Y REACTIVE FORMS
*/
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

/*
* ANGULAR MATERIAL
*/
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { HeaderComponent } from './components/header/header.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RegisterComponent } from './components/register/register.component';
import { MatMenuModule } from '@angular/material/menu';
import { AllSetupsComponent } from './components/all-setups/all-setups.component';
import { SetupComponent } from './components/setup/setup.component';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { LoggedComponent } from './components/logged/logged.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    HomeComponent,
    AllSetupsComponent,
    SetupComponent,
    AddComponent,
    EditComponent,
    LoggedComponent
  ],
  imports: [
    ClipboardModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatToolbarModule
  ],
  providers: [SetupService],
  bootstrap: [AppComponent]

})
export class AppModule { }
