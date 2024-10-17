import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from '../guard/auth.guard';
import { redirectIfAuthGuard } from '../guard/redirect-if-auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirigir la ruta raíz a login
  { path: 'login', component: LoginComponent },         // Ruta para el componente login
  { path: 'home', component: HomeComponent, canActivate: [authGuard] }, // Ruta protegida de home
  { path: 'logout', component: LogoutComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
];


@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
