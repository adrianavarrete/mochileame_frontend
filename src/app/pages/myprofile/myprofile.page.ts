import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit {

  user = new User();
  idUser = localStorage.getItem("idUser");

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getUser(this.idUser);
  }

  getUser(idUser: string) {
    this.userService.getUsuario(idUser)
      .subscribe(res => {
        console.log(res);
        this.user = res;

      });
  }
  
  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }
}
