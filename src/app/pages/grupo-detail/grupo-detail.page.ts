import { Component, OnInit } from '@angular/core';
import { routesService } from '../../services/routesService';
import { TravelGroup } from '../../models/travel-group';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import { stringify } from 'querystring';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupo-detail',
  templateUrl: './grupo-detail.page.html',
  styleUrls: ['./grupo-detail.page.scss'],
})
export class GrupoDetailPage implements OnInit {

  id: string;
  iduser: string;
  groupActual: TravelGroup = new TravelGroup;
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
  constructor( private router: Router,private userService: UserService, private service: routesService) { }
  aa: TravelGroup;
  imageToShow: any;
  isImageLoading: boolean;

  async ngOnInit() {

    this.id = localStorage.getItem('idUser');
    await this.getTravelGroup();
    this.getUser(this.id);
    this.iduser = this.groupActual.createdBy
    //this.findUserInTravel();
    this.lista = this.groupActual.users;
    


  }

  arreglarFechas(dateFin2: Date, dateIn2: Date) {
    this.dateFinDate = dateFin2.toString().split('T');
    this.dateFin = this.dateFinDate[0];
    this.dateInDate = dateIn2.toString().split('T');
    this.dateIn = this.dateInDate[0];
  }

  async  getTravelGroup() {

    this.service.getTravelGroup()
      .subscribe((res) => {

        this.groupActual = res;
        this.arreglarFechas(this.groupActual.travelDateFin, this.groupActual.travelDateInit);
        this.getUserCreador(this.groupActual.createdBy);
        this.listaUsuariosDentro = [];
        this.getListaUsuariosDentro();
        this.findUserInTravel();
        if(this.groupActual.path != "Nada" && this.groupActual.path != null){
        this.getImageFromService();
        }

        localStorage.setItem("nameTravelGroup", res.name);

      }, (error) => {
        console.log("Ha habido un problema recuperando el grupo");
      }
      );
  }



  getListaUsuariosDentro() {
    this.groupActual.users.forEach(stringUser => {

      this.AddUserToActualUsersList(stringUser);

    });
  }
  getUserCreador(id: string) {
    this.userService.getUsuario(id)
      .subscribe(res => {
        console.log(res);
        this.userCreador = res;

      });

  }

  getUser(id: string) {
    this.userService.getUsuario(id)
      .subscribe(res => {
        console.log(res);
        this.user = res;

      });

  }

  AddUserToActualUsersList(id: string) {
    this.userService.getUsuario(id)
      .subscribe(res => {
        console.log(res);
        this.listaUsuariosDentro.push(res);

      });

  }


  DelUserGroup() {

    this.delUserInTravelGroup = new TravelGroup();

    this.groupActual.users.forEach(stringUser => {

      if (this.id != stringUser) {
        this.delUserInTravelGroup.users.push(stringUser);
      }

    });

    this.service.delUserInGroup(this.delUserInTravelGroup, this.groupActual._id)
      .subscribe((res) => {

        console.log(res);
        this.getTravelGroup();

      }), ((error) => {
        console.log(error);
      });


  }


  findUserInTravel() {
    this.show = true;
    this.groupActual.users.forEach(stringUser => {

      if (this.id == stringUser) {
        this.show = false;
      }

    });
  }

  showFunc() {
    if (this.show == true) { this.show = false; }
    else { this.show = true; }
  }


  getImageFromService() {
    this.isImageLoading = true;
    this.service.getFoto(this.groupActual.path).subscribe(data => {
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

  chat(){    
    this.router.navigateByUrl('/chat');
  }

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
