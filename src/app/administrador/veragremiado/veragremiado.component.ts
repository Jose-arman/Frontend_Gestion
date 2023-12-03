import { Component, AfterViewInit, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgremiadoService } from 'src/app/agremiado.service';
import Swal from 'sweetalert2';


interface Curso {
  id: number;
  a_paterno: string;
  a_materno: string;
  nombre: string;
  sexo: string;
  NUP: string;
  NUE: string;
  RFC: string;
  NSS: string;
  fecha_nacimiento: Date,
  telefono: string;
  cuota: boolean;
}
declare var $: any; // Asegúrate de tener jQuery disponible globalmente


@Component({
  selector: 'app-veragremiado',
  templateUrl: './veragremiado.component.html',
  styleUrls: ['./veragremiado.component.css']
})


export class VeragremiadoComponent implements OnInit, AfterViewInit{ 
  agremiados: any[] = []; 


  

  constructor(private agremiado: AgremiadoService, private rou: Router) {
  }
  

  

  ngOnInit() {
    this.getAgremiados();
    
    
  }

  ngAfterViewInit(): void {
  
  }

  
  getAgremiados() {
    this.agremiado.getVerAagremido().subscribe(
      (data) => {
        this.agremiados = data;
        console.log('Datos obtenidos:', this.agremiados);

        // Lógica de DataTables aquí, después de obtener los datos
        $(document).ready(() => {
          const table = $('#table-data-agremiados').DataTable({
            dom: 'lBfrtip',
            buttons: [
            //  {
             //   extend: 'copy',
            //    exportOptions: {
             //     columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
            //    },
            //     className: 'btn-exportar btn-azul',
             // },
              {
                extend: 'csv',
                exportOptions: {
                  columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                }
              },
              {
                extend: 'excel',
                exportOptions: {
                  columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                }
              },
              {
                extend: 'pdf',
                exportOptions: {
                  columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                }
              },
              {
                extend: 'print',
                exportOptions: {
                  columns: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
                }
              },
            ],
            // Otros parámetros y configuraciones de DataTables
          });

          // Oculta la columna de opciones en la versión impresa
        });
      },
      (error) => {
        console.error('Error al obtener agremiados:', error);
      }
    ); 
  }


  

  //editarAgremiado(agremiado: any) {
    // Agrega lógica para editar un agremiado
   // console.log('Editar agremiado:', agremiado);
  //}

  eliminarAgremiado(id: number) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-1',
        cancelButton: 'btn btn-danger mx-1'
      },
      buttonsStyling: false
    });
  
    swalWithBootstrapButtons.fire({
      title: '¿Deseas eliminar agremiados?',
      text: '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, aceptar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.agremiado.eliminarAgremiado(id).subscribe(
          (res: any) => {
            console.log('Agremiado eliminado:', res);
            // Recargar los datos después de la eliminación
            this.getAgremiados();
            // Aquí puedes realizar acciones adicionales después de la eliminación
            swalWithBootstrapButtons.fire(
              '¡Aceptado!',
              'Agremiado ha sido eliminado',
              'success'
            );
          },
          (error) => {
            console.error('Error al eliminar agremiado:', error);
            // Puedes manejar el error aquí, por ejemplo, mostrando una alerta con SweetAlert
            Swal.fire('Error', 'Error al eliminar el agremiado', 'error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Operación cuando se cancela
      }
    });
  }


  editaragremiado(id: number){
    console.log('TESING', id);
    this.goodNot();
    this.rou.navigateByUrl(`homeadmin/editaragremiado/${id}`); 
  }

  //dtOptions: DataTables.Settings = {};
  goodNot() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Agremiado editado exitosa!!!',
      showConfirmButton: false,
      timer: 1500
    });
  }


}