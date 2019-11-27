import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router } from "@angular/router";
import { Route } from '@angular/compiler/src/core';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  user = new User();
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  registerUser(form: NgForm) {

    this.user.mail = form.value.mail;
    this.user.password = form.value.pass;
    this.user.username = form.value.username;
    var pass2 = form.value.pass2;

    if (pass2 == this.user.password) {
      console.log(this.user);
      this.userService.register(this.user)
        .subscribe(res => {
          console.log(res);
          localStorage.setItem("idUser", res._id);
          this.resetForm(form);
          this.router.navigateByUrl("/profile-details");
        });
    }
    else {
      this.resetForm(form);
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }

}
