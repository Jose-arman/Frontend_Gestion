import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter, } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgremiadoService {

  url: string = 'http://localhost:8000/api';

  token: any = '';
  user: any = {};
  datos: any;



  constructor(private http: HttpClient) {

}



getVerAagremido(): Observable<any>{
  return this.http.get<any>(this.url+'/obtenerAgremiados');
}

eliminarAgremiado(id: number): Observable<any> {
  return this.http.delete<any>(`${this.url}/eliminarAgremiado/${id}`);
}

actualizarAgremiado(id: number, datosActualizados: any): Observable<any> {
  return this.http.patch<any>(`${this.url}/actualizarAgremiado/${id}`, datosActualizados);
}

obtenerAgremiadoPorId(id: number): Observable<any> {
  return this.http.get<any>(`${this.url}/obtenerAgremiado/${id}`);
}


agregarAgremiado(datosNuevoAgremiado: any): Observable<any> {
  return this.http.post<any>(`${this.url}/agregarAgremiado`, datosNuevoAgremiado);
} 

private apiUrl = 'http://localhost:8000/api/agregarAgremiado';


agregarAgremiado2(agremiadoData: any): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.http.post<any>(this.apiUrl, agremiadoData, { headers });
}


  NUE: any = {};

  isAuth(): boolean {
    this.token = localStorage.getItem('token') || null;
    this.NUE = JSON.parse(localStorage.getItem('NUE') || 'null') || null;

    if (this.token === null || this.NUE === null) {
      return false
    } else {
      return true
    }

  }


  // Acuatlizar datos de usuario por id
  updateUserById(id: number, formData: FormData): Observable<any> {
    // Obtener el token del local storage
    const token = localStorage.getItem('token');
    console.log(token);
    // Verificar si el usuario está autenticado
    if (this.isAuth() && token) {
      console.log('Entro al if');
      // Configurar las cabeceras con el token de autenticación
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      console.log('token', headers);
      // Realizar la solicitud a la API utilizando el token en las cabeceras
      return this.http.put(this.url + `/api/actualizarAgremiado/${id}`, formData, { headers });
    } else {
      return new Observable();
    }
  }


  getUserOnlyId(id: number): Observable<any> {
    // Obtener el token del local storage
    console.log(id);

    const token = localStorage.getItem('token');
    console.log(token);

    // Verificar si el usuario está autenticado
    if (this.isAuth() && token) {

      console.log('Entro al if');
      // Configurar las cabeceras con el token de autenticación
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      // Realizar la solicitud a la API utilizando el token en las cabeceras
      return this.http.get(this.url + `/api/users/${id}`, { headers });
    } else {
      return new Observable(); // Puedes también retornar throwError o un observable vacío, según tu necesidad.
    }

  }

  getNewAgremiado: EventEmitter<any>= new EventEmitter();

  setNewAgremiado(agremiado:any){
    this.getNewAgremiado.emit(agremiado);
  }

 

}


