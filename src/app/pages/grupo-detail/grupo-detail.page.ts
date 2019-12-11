import { Component, OnInit } from '@angular/core';
import {routesService} from '../../services/routesService';
import {TravelGroup} from '../../models/travel-group';
import { User } from 'src/app/models/user';



@Component({
  selector: 'app-grupo-detail',
  templateUrl: './grupo-detail.page.html',
  styleUrls: ['./grupo-detail.page.scss'],
})
export class GrupoDetailPage implements OnInit {

  grupoActual : TravelGroup = new TravelGroup;
  listausuarios : User [];


  constructor(private service: routesService) { }

  ngOnInit() {
    this.getTravelGroup();

  }

getTravelGroup()
{

  this.service.getTravelGroup()
    .subscribe((res) => {

      this.grupoActual = res;
      // localStorage.setItem("idTravelGroup", "");

},(error) => {
  console.log("Ha habido un problema recuperando el grupo");
}
);

  
}
}
