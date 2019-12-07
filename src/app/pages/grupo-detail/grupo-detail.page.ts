import { Component, OnInit } from '@angular/core';
import {routesService} from '../../services/routesService';
import {TravelGroup} from '../../models/travel-group';



@Component({
  selector: 'app-grupo-detail',
  templateUrl: './grupo-detail.page.html',
  styleUrls: ['./grupo-detail.page.scss'],
})
export class GrupoDetailPage implements OnInit {

  groupActual : TravelGroup;

  constructor(private service: routesService) { }

  ngOnInit() {
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
}
