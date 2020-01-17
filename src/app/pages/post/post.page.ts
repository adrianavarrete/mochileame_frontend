
import { Component, OnInit } from '@angular/core';
import { ForoService } from '../../services/foro.service';
import { TravelGroup } from '../../models/travel-group';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import { stringify } from 'querystring';
import { Foro } from '../../models/foro';
import { Message } from '../../models/message'
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  imageToShow: any;
  isImageLoading: boolean;

  id: string;
  idpost: string;
  iduser: string;
  postActual: Foro = new Foro;
  delUserInTravelGroup: TravelGroup;
  show: Boolean;
  name: string;
  user: User = new User;
  userCreador: User = new User;
  lista: string[] = [];
  dateFinDate: string[] = [];
  dateFin: string = "";
  dateIn: string = "";
  dateInDate: string[] = [];
  listaUsuariosDentro: User[] = [];
  constructor(private userService: UserService, private service: ForoService) { }
  updatePost: Foro = new Foro;

  lista1: Message[] = [];
  message : Message = new Message;

  userDelPost: User = new User;

  showCambiarEstado: Boolean;
  showNoPoderPostear: Boolean;
  showboton: Boolean;
  async ngOnInit() {

    this.showCambiarEstado = true;
    this.showNoPoderPostear= false;
    this.showboton = false;
    this.id = localStorage.getItem('idUser');
    this.idpost = localStorage.getItem('idforo');
    ;
    await this.getPost();
    //this.getUser(this.id);
  

  }


  getImageFromService() {
    this.isImageLoading = true;
    this.service.getFoto(this.postActual.path).subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
}


  createImageFromBlob(image: Blob) {
     let reader = new FileReader();
     reader.addEventListener("load", () => {
        this.imageToShow = reader.result;
     }, false);
  
     if (image) {
        reader.readAsDataURL(image);
     }
  }
showEstado()
{
  if (this.id == this.postActual.creador)
  {
    this.showCambiarEstado = false;
  }
}

showPostear()
{
  if (this.postActual.estado == "Cerrado")
  {
    this.showNoPoderPostear = true;
    this.showCambiarEstado = true;
    this.showboton = true;
  }
}


  cogerMensajes(listaMensajes) {
    
    this.lista1 = [];
    listaMensajes.forEach(element => {
      
      var messageConSplit = element.toString().split('/');
      this.message = new Message;
      this.message.texto = messageConSplit[0];
      this.message.user = messageConSplit[1];
      
      this.lista1.push(this.message);


    });
  }


  postea(form : NgForm)
  {

    
    var newMessage = form.value.textarea + "/" + this.user.name;
    this.updatePost = this.postActual;
    this.updatePost.mensajes.push(newMessage);
    if (form.value.estado != null || form.value.estado != "" || form.value.estado != undefined)
    {
    this.updatePost.estado = form.value.estado;
    }

    this.service.updatePost(this.updatePost)
      .subscribe((res) =>{

        this.getPost();
      }, (error) => {})

  }

  getUserCreador(id)
  {
  
    this.userService.getUsuario(id)
      .subscribe(res => {
        console.log(res);
        this.userDelPost = res;

      });}
  async  getPost() {

    await this.service.getPost(this.idpost)
      .subscribe((res) => {

        this.getUserCreador(res.creador);
        this.postActual = res;
        this.cogerMensajes(res.mensajes);
        this.showEstado();    
        this.showPostear();
        this.getImageFromService();
        //this.getListaUsuariosDentro();
        //this.findUserInTravel();

      }, (error) => {
        console.log("Ha habido un problema recuperando el grupo");
      }
      );
  }



  // getListaUsuariosDentro() {
  //   this.groupActual.users.forEach(stringUser => {

  //     this.AddUserToActualUsersList(stringUser);

  //   });
  // }
  // getUserCreador(id: string) {
  //   this.userService.getUsuario(id)
  //     .subscribe(res => {
  //       console.log(res);
  //       this.userCreador = res;

  //     });

  // }

  getUser(form  : NgForm) {
    this.userService.getUsuario(this.id)
      .subscribe(res => {
        console.log(res);
        this.user = res;

        this.postea(form)
      });

  }

  // AddUserToActualUsersList(id: string) {
  //   this.userService.getUsuario(id)
  //     .subscribe(res => {
  //       console.log(res);
  //       this.listaUsuariosDentro.push(res);

  //     });

  // }


  // DelUserGroup() {

  //   this.delUserInTravelGroup = new TravelGroup();

  //   this.groupActual.users.forEach(stringUser => {

  //     if (this.id != stringUser) {
  //       this.delUserInTravelGroup.users.push(stringUser);
  //     }

  //   });

  //   this.service.delUserInGroup(this.delUserInTravelGroup, this.groupActual._id)
  //     .subscribe((res) => {

  //       console.log(res);
  //       this.getTravelGroup();

  //     }), ((error) => {
  //       console.log(error);
  //     });


  // }


  // findUserInTravel() {
  //   this.show = true;
  //   this.groupActual.users.forEach(stringUser => {

  //     if (this.id == stringUser) {
  //       this.show = false;
  //     }

  //   });
  // }

  // showFunc() {
  //   if (this.show == true) { this.show = false; }
  //   else { this.show = true; }
  // }




  // async getTravelGrou2()
  // {

  //  let promesa = await new Promise(function(resolve, reject) {

  //     this.service.getTravelGroup()
  //     .subscribe((res) => {

  //     resolve (res)
  //       },(error) => {
  //       console.log("Ha habido un problema recuperando el grupo");
  //       return error;
  //       resolve(error);
  //   ;
  // }
  // );

  //   });

  //   return promesa;

  // }


}
