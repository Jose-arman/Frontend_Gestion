import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    NUE: string = '';
    password: string = '';
  
    constructor(private authService: LoginService, private router: Router) { }
  
    login() {
      this.authService.login(this.NUE, this.password).subscribe(response => {
      console.log("Entrando al sistema");
      });
    }
    navigateTo(route: string) {
      this.router.navigate([`/${route}`]);
    }
  }
