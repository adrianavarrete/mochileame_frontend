import { Component, OnInit } from '@angular/core';
import { routesService } from '../../services/routesService';
import { HttpClientModule } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';





@Component({
  selector: 'app-loguin',
  templateUrl: './loguin.page.html',
  styleUrls: ['./loguin.page.scss'],
})
export class LoguinPage implements OnInit {


  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    // route.params.subscribe(val => { // necesario para poder volver a ejecutar ngoninit al volver de otra pagina
    //   this.getUser(this.userLogin._id);
    // });
   }
  userLogin: User;



  ngOnInit() {
  }

  login(form: NgForm) {


    this.userService.login(form.value.username, form.value.password)
      .subscribe((res) => {
        console.log(res)

        if (res == null) {
          res['data']
        } else if (res != null) {
          //this.userLogin = res;
          localStorage.setItem("idUser", res['data']._id);
          localStorage.setItem("token", res['accessToken']);
          this.router.navigateByUrl("/tabs/tab1"); //asereje ja deje escucfhimi escuchiti
        }
      });
  }

  goRegister() {
    this.router.navigateByUrl('/sign-up');
  }

  getUser(idUser: string) {
    this.userService.getUsuario(idUser)
      .subscribe(res => {
        console.log(res);
        this.userLogin = res;

      });

  }

}
