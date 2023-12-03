import { Component } from '@angular/core';
import { SolicitudService } from 'src/app/solicitud.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})

export class SolicitudComponent {
  solicitudes: any[] = [];
  fechaInicio?: Date;
  fechaFin?: Date;
  solicitudOrginales: any[]=[];
  solicitudFiltrado: any[]=[];
  

   // Ajusta el tipo de datos según la estructura de tus solicitudes
  

  constructor(private solic: SolicitudService, 
    ) {}

  ngOnInit() {
    this.getsolicitud();
  }

  

  getsolicitud() {
    this.solic.getVersolicitud().subscribe(
      (data) => {
        this.solicitudOrginales = data;
        this.solicitudes = data;
        console.log('Datos obtenidos:', this.solicitudes);
      },
      (error) => {
        console.error('Error al obtener solicitud:', error);
      }
    );
  }
  


    // Agrega esta función para filtrar las solicitudes por fecha
    filtrarSolicitudes() {
      if (this.fechaInicio && this.fechaFin) {
        const fechaInicio = new Date(this.fechaInicio);
        const fechaFin = new Date(this.fechaFin);
    
        console.log(fechaInicio);
        console.log(fechaFin);
    
        this.solicitudFiltrado = this.solicitudOrginales.filter((solicitud) => {
          const fechaSolicitud = new Date(solicitud.updated_at);
          return fechaSolicitud >= fechaInicio && fechaSolicitud <= fechaFin;
        });
        
        this.solicitudes = this.solicitudFiltrado.length > 0 ? this.solicitudFiltrado : this.solicitudOrginales;
      }
    
      // Lógica para filtrar las solicitudes según las fechas seleccionadas
      // Utiliza la función filter para obtener solo las solicitudes que cumplen con el criterio
      
      }
  
}
