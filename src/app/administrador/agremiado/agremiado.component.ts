import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgremiadoService } from 'src/app/agremiado.service';

@Component({
  selector: 'app-agremiado',
  templateUrl: './agremiado.component.html',
  styleUrls: ['./agremiado.component.css']
})
export class AgremiadoComponent {
  agremiadoForm: FormGroup;


  constructor(private fb: FormBuilder, private tuServicio: AgremiadoService) {
    this.agremiadoForm = this.fb.group({
      a_paterno: ['', Validators.required],
      a_materno: [''],
      nombre: ['', Validators.required],
      sexo: ['', Validators.required],
      NUP: ['' , Validators.required], 
      NUE: ['', Validators.required],
      RFC: ['', Validators.required],
      NSS: ['', Validators.required],
      fecha_nacimiento: [null, Validators.required], // Cambiado a date
      telefono: ['', Validators.required],
      cuota: ['', Validators.required]
    });
  }

  agregarAgremiado() {
    const datosNuevoAgremiado = this.agremiadoForm.value;

    this.tuServicio.agregarAgremiado(datosNuevoAgremiado).subscribe(
      response => {
        console.log('Agremiado agregado correctamente', response);
        // Puedes realizar alguna acción adicional después de la creación
      },
      error => {
        console.error('Error al agregar agremiado', error);
        // Manejar el error si es necesario
      }
    );
  }
}