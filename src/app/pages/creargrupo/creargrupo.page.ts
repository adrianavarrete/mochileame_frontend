import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {TravelGroup} from 'src/app/models/travel-group'
import { routesService } from 'src/app/services/routesService';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-creargrupo',
  templateUrl: './creargrupo.page.html',
  styleUrls: ['./creargrupo.page.scss'],
})

export class CreargrupoPage implements OnInit {

  travelgrup = new TravelGroup();
  idUser: string = localStorage.getItem('idUser');
  añadirmeTravel: TravelGroup;
  creador : User;
  listaUserGroup: [] = [];
  borradorDeGrupo = new TravelGroup();

  name: any;
  destino:any;
  max: any;
  fechainicio: any;
  fechafin: any;
  gender: any;



 
  constructor( public userService: UserService, public routesService: routesService, private router: Router) { }

  ngOnInit() {

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


  creargrupo(form: NgForm) {


  if(form.value.name != null){
    this.travelgrup.name = form.value.name;
  }
  if(form.value.destino != null){
    this.travelgrup.destination = form.value.destino;
  }
  if(form.value.max != null){
    this.travelgrup.maxNumUsers = form.value.max;
  }
  if(form.value.fechainicio != null){
    this.travelgrup.travelDateInit = form.value.fechainicio;
    this.travelgrup.dateOfCreation =form.value.fechainicio;
  }
  if(form.value.fechafin != null){
    this.travelgrup.travelDateFin = form.value.fechafin;
  }
  if(form.value.gender != null){
    this.travelgrup.gender = form.value.gender;
  }

  this.travelgrup.privacity = false;
  this.travelgrup.createdBy = this.creador._id;
  this.travelgrup.hobbies = this.creador.hobbies;
  this.travelgrup.users.push(this.creador._id);

  
this.routesService.creargrupo(this.travelgrup)
    .subscribe(res => {
      console.log(res);
      this.travelgrup = this.borradorDeGrupo;
      this.resetForm(form);
      this.router.navigateByUrl("/tabs/tab1");
    }), (error => {
      console.log(error);
      
    });



  }



  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }




}


