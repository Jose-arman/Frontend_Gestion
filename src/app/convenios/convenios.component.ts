import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../login.service';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-convenios',
  templateUrl: './convenios.component.html',
  styleUrls: ['./convenios.component.css']
})


export class ConveniosComponent {
  

  constructor(private rou: Router, private authS: LoginService, private fb: FormBuilder) {}

  
  


  salir() {
    this.rou.navigateByUrl('login'); 
  }
   

}
