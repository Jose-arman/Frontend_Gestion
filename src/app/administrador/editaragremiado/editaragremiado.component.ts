import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgremiadoService } from 'src/app/agremiado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editaragremiado',
  templateUrl: './editaragremiado.component.html',
  styleUrls: ['./editaragremiado.component.css']
})
export class EditaragremiadoComponent implements OnInit {

  id_user: any;
  user_data: any = {};
  agremiadoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private tuServicio: AgremiadoService,
    private rou: ActivatedRoute,
    private router: Router
  ) {

    this.agremiadoForm = this.fb.group({
      a_paterno: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      a_materno: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      sexo: ['', Validators.required],
      NUP: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      NUE: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      RFC: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      NSS: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      fecha_nacimiento: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      cuota: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.rou.params.subscribe(params => {
      this.id_user = params['id'];
      this.obtenerDatosAgremiado(this.id_user);
    });

    
  }

  obtenerDatosAgremiado(id: number): void {
    this.tuServicio.obtenerAgremiadoPorId(id).subscribe(
      (data) => {
        this.user_data = data;
        this.agremiadoForm.patchValue(this.user_data);
      },
      (error) => {
        console.error("Error al obtener los datos del agremiado", error);
      }
    );
  }

  actualizarAgremiado() {
    const datosActualizados = this.agremiadoForm.value;
    this.tuServicio.actualizarAgremiado(this.id_user, datosActualizados).subscribe(
      () => {
        this.goodNot();
        this.router.navigate(['homeadmin/veragremiado']);
      },
      (error) => {
        console.error("Error al actualizar el agremiado", error);
      }
    );
  }

  salir(){
    this.router.navigateByUrl('homeadmin/veragremiado'); 
   
  }

  goodNot() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Actualización exitosa!!!',
      showConfirmButton: false,
      timer: 1500
    });
  }
}
