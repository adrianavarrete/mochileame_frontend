import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit, OnDestroy {

  user = new User('','','','','','','','','','','','','','');
  idUser = localStorage.getItem('idUser');

  constructor(public userService: UserService, private router: Router, private route: ActivatedRoute) {
      route.params.subscribe(val => { // necesario para poder volver a ejecutar ngoninit al volver de otra pagina
      this.getUser(this.idUser);
    });
   }

  ngOnInit() {
    this.getUser(this.idUser);


  }

  ngOnDestroy() {
    console.log("Cambiar tab");
  }

  getUser(idUser: string) {
    this.userService.getUsuario(idUser)
      .subscribe(res => {
        console.log(res);
        this.user = res;
        console.log(this.user);

      });

  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }

  goProfile() {
    this.router.navigateByUrl('/profile-details');
  }

  goFriends() {
    this.router.navigateByUrl('/friends');
  }


  logout() {
    localStorage.removeItem("idUser");
    this.router.navigateByUrl('/login');
  }
}
