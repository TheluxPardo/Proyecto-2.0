import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';

import { PagesRoutingModule } from './pages-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';  // Importa el componente de registro

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent  // Declara el componente de registro
  ],
  imports: [
    CommonModule,
    QRCodeModule,
    PagesRoutingModule,
    IonicModule,
    FormsModule
  ]
})
export class PagesModule { }
