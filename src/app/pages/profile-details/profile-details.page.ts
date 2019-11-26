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

  user = new User();
  _id = '5dd58ae047cf7c25c04f1a4c';
  username = 'prueba';
  mail = 'mail';
  password = 'wfwf';

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  updateProfileDetails(form: NgForm) {

    // this.phones.set(form.value.key, form.value.value);

    this.user._id = this._id;
    this.user.username = this.username;
    this.user.mail = this.mail;
    this.user.password = this.password;

    this.user.name = form.value.name;
    this.user.lastname = form.value.lastname;
    this.user.dateofbirth = form.value.dateofbirth;
    this.user.nationality = form.value.nationality;
    this.user.gender = form.value.gender;
    this.user.biography = form.value.biography;
    this.user.hobbies = form.value.hobbies;

    console.log(this.user);

    this.userService.updateUser(this.user)
      .subscribe(res => {
        console.log(res);
        this.resetForm(form);

      });

  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }

}
