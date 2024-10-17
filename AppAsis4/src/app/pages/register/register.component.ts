import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  usuario: string;
  clave: string;
  nombreCompleto: string;
  telefono: string;
  rol: string;
  successMessage: string;
  errorMessage: string;

  registrar() {
    if (this.usuario && this.clave && this.nombreCompleto && this.telefono && this.rol) {
      // Simula un registro exitoso
      this.successMessage = 'Usuario registrado con éxito';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Por favor, complete todos los campos';
      this.successMessage = '';
    }
  }
}
