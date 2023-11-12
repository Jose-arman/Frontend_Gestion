import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiBaseUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) { }

  login(NUE: string, password: string): Observable<any> {
    // Realiza la solicitud POST al servidor para autenticar al usuario
    const data = { NUE, password };
    return this.http.post(this.apiBaseUrl + 'login', data);
  }


   //Guardar token en localStorage
   saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  //Guardar datos del usuario en localStorage
  saveUser(NUE: any) {
    localStorage.setItem('user', JSON.stringify(NUE));

  }

  
}
