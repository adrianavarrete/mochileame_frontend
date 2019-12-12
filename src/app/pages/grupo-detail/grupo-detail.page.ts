import { Component, OnInit } from '@angular/core';
import {routesService} from '../../services/routesService';
import {TravelGroup} from '../../models/travel-group';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
 
@Component({
  selector: 'app-grupo-detail',
  templateUrl: './grupo-detail.page.html',
  styleUrls: ['./grupo-detail.page.scss'],
})
export class GrupoDetailPage implements OnInit {
 
  id: string;
  iduser: string;
  groupActual : TravelGroup = new TravelGroup;
  delUserInTravelGroup: TravelGroup;
  show: Boolean;
  name : string;
  user : User = new User;
  lista : string[] = [];
  
  constructor(private userService: UserService, private service: routesService) { }
 
  ngOnInit() 
  {
    
    this.id = localStorage.getItem('idUser');
    this.getTravelGroup();
    this.iduser = this.groupActual.createdBy
    this.findUserInTravel();
    this.getUser(this.iduser); 
    this.lista = this.groupActual.users;
   
  }
 
getTravelGroup()
{
 
  this.service.getTravelGroup()
    .subscribe((res) => {
 
      this.groupActual = res;
      localStorage.setItem("idTravelGroup", "");
 
},(error) => {
  console.log("Ha habido un problema recuperando el grupo");
}
);
}

getUser(iduser: string) {
  this.userService.getUsuario(iduser)
    .subscribe(res => {
      console.log(res);
      this.user = res;

    });

}
 


addUserInGroup(addUserTravelGroup: TravelGroup) {
 
  this.delUserInTravelGroup = new TravelGroup();
 
  this.groupActual.users.forEach(stringUser => {
 
    if (this.id != stringUser)
   {
    this.delUserInTravelGroup.users.push(stringUser);
   }
 
  });



  
 
  this.service.delUserInGroup(this.delUserInTravelGroup, this.groupActual._id)
    .subscribe((res) => {
 
      console.log(res);
      this.getTravelGroup();
      this.show = false;;
      
    }), ((error) => {
      console.log(error);
    });
 
 
 
}
 
 
findUserInTravel()
{
  this.show = false;
  this.groupActual.users.forEach(stringUser => {
 
    if (this.id == stringUser)
   {
    this.show = true;
   }
 
  });
}
 
showFunc(){
  if (this.show == true){ this.show = false;}
  else {this.show = true;}
}
 




}
