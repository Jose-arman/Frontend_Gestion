import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-formatos',
  templateUrl: './formatos.component.html',
  styleUrls: ['./formatos.component.css']
})
export class FormatosComponent {

  
  constructor(private rou: Router, private authS: LoginService, private fb: FormBuilder) {}

  
  downloadWordFile(): void {
    const filePath = 'assets/Formato.docx';
    const link = document.createElement('a');
    link.href = filePath;
    link.download = 'Formato.docx';
    link.click();
  }

  salir() {
    this.rou.navigateByUrl('login'); 
  }

  
   
  

}
