import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.page.html',
  styleUrls: ['./profile-details.page.scss'],
})
export class ProfileDetailsPage implements OnInit {

  user = new User('', '', '', '', '', '', '', '', '', '', '', '', '', '');
  idUser = localStorage.getItem("idUser");

  name: any;
  lastname: any;
  dateofbirth: any;
  nationality: any;
  gender: any;
  biography: any;
  hobbies: any;
  score: any;


  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getUser(this.idUser);
  }

  updateProfileDetails(form: NgForm) {

    // this.phones.set(form.value.key, form.value.value);

    if (form.value.name != null) {
      this.user.name = form.value.name;
    }
    if (form.value.lastname != null) {
      this.user.lastname = form.value.lastname;
    }
    if (form.value.dateofbirth != null) {
      this.user.dateofbirth = form.value.dateofbirth;
    }
    if (form.value.nationality != null) {
      this.user.nationality = form.value.nationality;
    }
    if (form.value.gender != null) {
      this.user.gender = form.value.gender;
    }
    if (form.value.biography != null) {
      this.user.biography = form.value.biography;
    }
    if (form.value.hobbies != null) {
      this.user.hobbies = form.value.hobbies;
    }

    console.log(this.user);

    this.userService.updateUser(this.user)
      .subscribe(res => {
        console.log(res);
        this.resetForm(form);
        this.router.navigateByUrl("/tabs/tab1");

      });

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

}
