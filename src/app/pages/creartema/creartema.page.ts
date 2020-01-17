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
  
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  idPost :String;
  show: Boolean;
  foroborrador : Foro = new Foro;



 
  constructor( public userService: UserService, public foroService: ForoService , private router: Router) { }

  ngOnInit() {

    this.show = true;
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
 this.foro.estado = "abierto";
 this.foro.path = "nada";

this.foroService.postPost(this.foro)
    .subscribe(res => {
      console.log(res);
      //this.router.navigateByUrl('/foro');
      this.idPost = res._id;
      this.show = false;
      this.foro = this.foroborrador;
         }), (error => {
      console.log(error);
      this.router.navigateByUrl('/foro');
      
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
    this.foroService.postFoto(formData)
         .subscribe(res => {
            console.log(res); 
            console.log(res['path']); 
            
            this.cambiarPath(this.idPost, res); 
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
  
  this.foroService.cambioPath(cambio)
    .subscribe(res=>{

      alert('Se ha creado y subido todo!');
      this.router.navigateByUrl('/foro');


    }),(error=>{})

}


}


