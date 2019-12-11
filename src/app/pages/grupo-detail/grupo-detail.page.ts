import { Component, OnInit } from '@angular/core';
import {routesService} from '../../services/routesService';
import {TravelGroup} from '../../models/travel-group';



@Component({
  selector: 'app-grupo-detail',
  templateUrl: './grupo-detail.page.html',
  styleUrls: ['./grupo-detail.page.scss'],
})
export class GrupoDetailPage implements OnInit {

  id: String;
  groupActual : TravelGroup;
  delUserInTravelGroup: TravelGroup;

  constructor(private service: routesService) { }

  ngOnInit() 
  {
    this.id = localStorage.getItem('idUser');
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

addUserInGroup(addUserTravelGroup: TravelGroup) {

  this.delUserInTravelGroup = new TravelGroup();

  this.groupActual.users.forEach(stringUser => {

    if (this.id == stringUser)
   {
    
   }

  })

  // this.service.addUserInGroup(this.addUSerAddInTheGroup, this.groupActual._id)
  //   .subscribe((res) => {

  //     console.log(res);
  //     this.getListaTravelGroups();
  //     // this.misGrupos.getListaTravelGroups();

  //   }), ((error) => {
  //     console.log(error);
  //   });



}


}
