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
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;  
  show: Boolean;
  idGrupo: any;


 
  constructor( public userService: UserService, public routesService: routesService, private router: Router, public service: routesService) { }

  ngOnInit() {

    this.show = true;
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
  this.travelgrup.path = "Nada";
  
this.routesService.creargrupo(this.travelgrup)
    .subscribe(res => {
      console.log(res);
      this.idGrupo = res._id;
      this.show = false;
      this.travelgrup = this.borradorDeGrupo;
      //this.resetForm(form);
      //this.router.navigateByUrl("/tabs/tab1");
    }), (error => {
      console.log(error);
      
    });



  }


  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
}

preview() {
  // Show preview 
  var mimeType = this.fileData.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }

  var reader = new FileReader();      
  reader.readAsDataURL(this.fileData); 
  reader.onload = (_event) => { 
    this.previewUrl = reader.result; 
  }
}

onSubmit() {
  const formData = new FormData();
    formData.append('file', this.fileData);
    this.service.postFoto(formData)
         .subscribe(res => {
            console.log(res); 
            console.log(res['path']  ); 
            this.cambiarPath(this.idGrupo, res); 
           //this.resetForm(form);
      //this.router.navigateByUrl("/tabs/tab1");
            
      })

      
}

cambiarPath(id: any, path: any)
{

  const cambio = ({
    id,
    path
  });
  
  this.service.cambioPath(cambio)
    .subscribe(res=>{

      alert('Se ha creado y subido todo!');
      this.router.navigateByUrl("/tabs/tab1");


    }),(error=>{})

}

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }




}


