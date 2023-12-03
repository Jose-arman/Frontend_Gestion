import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  url= 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  getVersolicitud(): Observable<any>{
    return this.http.get<any>(this.url+'/obtenerSolicitud');
  }


  agregarSolicitud(datosNuevoSolicitud: any) {
    return this.http.post(`${this.url}/agregarsolicitud`, datosNuevoSolicitud);
  } 
  
}
