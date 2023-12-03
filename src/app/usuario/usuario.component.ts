import { Component } from '@angular/core';
import { SolicitudService } from '../solicitud.service';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  datosNuevoSolicitud: any = {};
  respuestaSolicitud: any;
  archivoSeleccionado: File | null = null;
  selectedFile: any;
  Form_solicitud: any; // Asegúrate de que Form_solicitud esté declarado y accesible.

  constructor(private solicitudService: SolicitudService, private rou: Router, private authS: LoginService, private fb: FormBuilder) {
    this.Form_solicitud = this.fb.group({
      NUE: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10),]],
      ruta_archivo: ['', [Validators.required]]
    });
  }

  
  
  
  onFileSelected(event: any) {
    const archivoInput = event.target.files[0];
    this.selectedFile = archivoInput; // Cambié 'file' a 'archivoInput'
  }

  guardar() {
    if (this.selectedFile) {
      const formdata = new FormData();
      let data = this.Form_solicitud.getRawValue();
      for (const datakey in data) {
        formdata.append(datakey, data[datakey]);
      }
      formdata.append('ruta_archivo', this.selectedFile);
  
      this.solicitudService.agregarSolicitud(formdata).subscribe(
        (response) => {
          // Puedes manejar la respuesta del servicio aquí
          console.log('Agregado exitosamente');
          this.goodNot();
          
          // Reload the page after successful addition
          setTimeout(() => {
            location.reload();
          }, 2000); // Reload after 2 seconds (adjust as needed)
        },
        (error) => {
          // Handle error if needed
          console.error('Error al agregar solicitud', error);
        }
      );
    } else {
      console.log('No se ha seleccionado un archivo');
    }
  }

  goodNot() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Solicitud exitosa!!!',
      showConfirmButton: false,
      timer: 1500
    });
  }
  

  logOut() {
    this.authS.logOut();
  }

  confirmarAlert() {
    Swal.fire({
      title: 'Deseas salir?',
      text: 'Al aceptar saldrás del sistema',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        this.logOut();
        Swal.fire(
          'Sesión cerrada',
          'Regresa pronto',
          'success'
        );
      }
    });
  }
}
