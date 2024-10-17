import { Component } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router } from '@angular/router';
import { Usuario } from '../../models/bd.models';  // Asegúrate de importar la interfaz Usuario

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  isAuthenticated: boolean = false;
  userType: string = '';  // Variable para almacenar el tipo de usuario como string
  nombreCompleto: string = '';  // Variable para almacenar el nombre completo del usuario
  asignaturas = ['Aplicaciones Moviles', 'Calidad de Software', 'Arquitectura'];
  showAsignaturas = false;  // Controlar la visualización de las asignaturas
  showQRAlumnos = false;
  showQR = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // Obtener el estado de autenticación
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });

    // Suscribirse al usuario completo (de tipo Usuario)
    this.authService.usuario$.subscribe((usuario: Usuario) => {
      // Asegúrate de que usuario sea un objeto del tipo Usuario
      this.nombreCompleto = usuario.fullname;  // Asignar el nombre completo del usuario
      this.userType = usuario.rol;  // Asignar el tipo de usuario (Estudiante o Profesor)
    });
  }

  // Función para alternar la visualización de las asignaturas
  verAsignaturas() {
    this.showAsignaturas = !this.showAsignaturas;  // Alterna la visualización de las asignaturas
  }

  // Lógica para manejar el clic en una asignatura
  handleAsignaturaClick(asignatura: string) {
    if (this.userType === 'Estudiante') {
      this.showQRAlumnos = true;
    } else if (this.userType === 'Profesor') {
      this.showQR = true;
    }
  }

  // Lógica para cerrar el QR tanto para alumnos como para profesores
  cerrarQR() {
    this.showQRAlumnos = false;
    this.showQR = false;
  }

  // Función para salir (logout)
  salir() {
    this.authService.logout();  // Llamar al método de logout en el AuthService
    this.router.navigate(['/login']);  // Redirigir al usuario al login tras cerrar sesión
  }
}
