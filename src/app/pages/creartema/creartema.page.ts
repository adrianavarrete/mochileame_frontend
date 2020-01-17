import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';
import {Foro} from '../../models/foro';
import {ForoService} from '../../services/foro.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { runInThisContext } from 'vm';


@Component({
  selector: 'app-creartema',
  templateUrl: './creartema.page.html',
  styleUrls: ['./creartema.page.scss'],
})
export class CreartemaPage implements OnInit {

  foro : Foro;
  idUser: string = localStorage.getItem('idUser');
  creador : User;
  listaUserGroup: [] = [];
  

 



 
  constructor( public userService: UserService, public foroService: ForoService , private router: Router) { }

  ngOnInit() {

    this.foro = new Foro();
    this.getUser(this.idUser);

  }

 
  getUser(idUser: string) {
    this.userService.getUsuario(idUser)
      .subscribe((res => {
        console.log(res);
        this.creador = res;
        console.log(this.creador);
      }), (error => {
        console.log(error);
      }));
  }


  crearpost(form: NgForm) {


  if(form.value.titulo != null){
    this.foro.titulo = form.value.titulo;
 
  } 
  if(form.value.textarea != null){
    this.foro.mensajes.push(form.value.textarea + "/" + this.creador.name);
  }
 

 this.foro.creador = this.creador._id;
 this.foro.estado = "abierto" ;

  
  
  
this.foroService.postPost(this.foro)
    .subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('/foro');
         }), (error => {
      console.log(error);
      this.router.navigateByUrl('/foro');
      
    });



  }



}


