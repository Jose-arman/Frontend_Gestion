import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent {
  constructor(private rou: Router, private authS: LoginService) { }

 

  logOut() {
    //this.authS.logOut().subscribe(
     // (response) => {
     //   console.log('Logout exitoso:', response);
     //   localStorage.removeItem('token');
     //   localStorage.removeItem('user');
     //   this.rou.navigate(['/login']);
     // },
     // (error) => {
     //   console.error('Error al hacer logout:', error);
     // }
    //);
  }

  confirmarAlert() {
  //  Swal.fire({
   //   title: 'Are you sure?',
   //   text: "You won't be able to revert this!",
  //    icon: 'warning',
  //    showCancelButton: true,
  //    confirmButtonColor: '#3085d6',
  //    cancelButtonColor: '#d33',
 //     confirmButtonText: 'Yes, do it!'
 //   }).then((result) => {
  //    if (result.isConfirmed) {
  //      this.logOut();
  //      Swal.fire(
  //        'Logged Out!',
  //        'You have been logged out successfully.',
  //        'success'
  //      );
  //    }
  //  });
  }

 // userD: any;;
 // getUser() {
   // const userL = JSON.parse(localStorage.getItem('user') || '[]');
 //   this.userD = userL;
  //  console.log(this.userD);


//  }

}