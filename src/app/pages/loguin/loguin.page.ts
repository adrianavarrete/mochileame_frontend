import { Component, OnInit } from '@angular/core';
import {routesService} from '../../services/routesService';
import { HttpClientModule } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router} from "@angular/router";





@Component({
  selector: 'app-loguin',
  templateUrl: './loguin.page.html',
  styleUrls: ['./loguin.page.scss'],
})
export class LoguinPage implements OnInit {


  constructor(private userService: UserService, private router: Router) { }
  userLogin: User;

  ngOnInit() {
  }

  login(form: NgForm){


      this.userService.login(form.value.username, form.value.password)
      .subscribe((res) => {console.log(res)
       
        if ( res == null)
         {
       
         }else if (res != null)
         {
          this.userLogin = res;
          
         // localStorage.setItem("idUser", res._id);
          
          this.router.navigateByUrl("/tabs/tab1");


          this.router.navigateByUrl("/tabs/tab1");
           
         }
      })
    
    

  }

}
