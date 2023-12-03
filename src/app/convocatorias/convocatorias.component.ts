import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-convocatorias',
  templateUrl: './convocatorias.component.html',
  styleUrls: ['./convocatorias.component.css']
})
export class ConvocatoriasComponent {


  
  constructor(private rou: Router, private authS: LoginService, private fb: FormBuilder) {}

  
  


  salir() {
    this.rou.navigateByUrl('login'); 
  }
   
}
