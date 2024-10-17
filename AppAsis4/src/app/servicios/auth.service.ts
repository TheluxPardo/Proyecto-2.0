import { Injectable } from '@angular/core'; 
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../models/bd.models';
import { map } from 'rxjs/operators'; // Para procesar los resultados

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // URL de la API
  private apiUrl = 'https://670eccbc3e7151861655d148.mockapi.io/api/v99/AppAsi';

  constructor(private http: HttpClient) { } // Inyectar HttpClient

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  private loginFailedSubject = new BehaviorSubject<boolean>(false);
  loginFailed$ = this.loginFailedSubject.asObservable();

  // Método para registrar un usuario en MockAPI
  registerUser(newUser: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}`, newUser);
  }

  // Método para autenticar un usuario desde MockAPI
  buscarBD2(usuario: string, clave: string): void {
    this.http.get<Usuario[]>(`${this.apiUrl}`)
      .pipe(
        map(users => users.find(u => u.user === usuario && u.clave === clave))
      )
      .subscribe((usuarioEncontrado: Usuario | undefined) => {
        if (usuarioEncontrado) {
          this.isAuthenticatedSubject.next(true);
          this.usuarioSubject.next(usuarioEncontrado); // Enviar el objeto Usuario completo
          this.loginFailedSubject.next(false);
        } else {
          this.isAuthenticatedSubject.next(false);
          this.loginFailedSubject.next(true);
        }
      });
  }

  // Método para desloguear
  logout(): void {
    this.usuarioSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.loginFailedSubject.next(false);
  }

  isLoggedIn() {
    return this.isAuthenticated$;
  }
}
