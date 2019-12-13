import { Component, OnInit } from '@angular/core';
import { NgForm, Validators, FormControl, FormGroup } from "@angular/forms";
import { Toast } from "@ionic-native/toast";
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  
  form: FormGroup;
  user = new User();
  constructor(private userService: UserService) { 
    this.form = new FormGroup({
      mail: new FormControl('', Validators.pattern(".+\@.+\..+")),
      username: new FormControl('', Validators.required),
      pass: new FormControl('',Validators.required),
      pass2: new FormControl('', Validators.required)

    });

  }

  ngOnInit() {
    }

  registerUser(form: NgForm){

    this.user.mail = form.value.mail;
    this.user.password = form.value.pass;
    this.user.username = form.value.username;
    var pass2 = form.value.pass2;

    if(pass2 == this.user.password){
      console.log(this.user);
      this.userService.register(this.user)      
      .subscribe(res=> { 
        console.log(res);
        localStorage.setItem("idUser", res._id);
        this.resetForm(form);
      });
    }
    else{
      alert("Las contraseñas no coinciden!")
      this.resetForm(form);
    }    
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }
}
