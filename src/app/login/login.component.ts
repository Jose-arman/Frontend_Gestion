import { Component } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    NUE: string = '';
    password: string = '';
    loginForm!: FormGroup;
  
    constructor(private loginser: LoginService, private router: Router, private formBuilder: FormBuilder,
      private authS: AuthService) { }
  
    ngOnInit() {
      this.loginForm! = this.formBuilder.group({
        NUE: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        password: ['', [Validators.required, Validators.minLength(5)]]
      });
    }
  
    login() {
      const { NUE, password } = this.loginForm.value;
  
      if (!NUE || !password) {
        Swal.fire({
          icon: 'error',
          title: '¡Error!',
          text: 'Por favor ingrese su NUE y contraseña',
          showConfirmButton: true
        });
      } else {
        this.loginser.login(NUE, password).subscribe(
          (response: any) => {
            const token = response.token;
            const user = response.Usuario;
  
            this.authS.setToken(token);
            this.authS.setUser(user);
            this.authS.setLoggedInFlag(true);
  
            if (user.id_rol === 1) {
              this.router.navigate(['/homeadmin']);
              Swal.fire({
                icon: 'success',
                title: 'Hola!',
                text: 'Bienvenido a Administrador',
                showConfirmButton: true
              });
            } else if (user.id_rol === 2) {
              this.router.navigate(['/usuario']);
              Swal.fire({
                icon: 'success',
                title: 'Hola!',
                text: 'Bienvenido Usuario',
                showConfirmButton: true
              });
            } else {
              console.log('Rol no reconocido');
              Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Credenciales inválidas',
                showConfirmButton: true
              });
            }
          },
          (error) => {
            console.error('Credenciales incorrectas', error);
            Swal.fire({
              icon: 'error',
              title: '¡Error!',
              text: 'Credenciales incorrectas',
              showConfirmButton: true
            });
          }
        );
      }
    }
  
  
    NUE1() {
      return this.loginForm.get('NUE')?.touched || this.loginForm.get('NUE')?.dirty;
    }
  
    NUEV() {
      return this.loginForm.get('NUE')?.valid;
    }
  
    passwordT() {
      return this.loginForm.get('password')?.touched || this.loginForm.get('password')?.dirty;
    }
  
    passwordV() {
      return this.loginForm.get('password')?.valid;
    }
  }  