import { Component, OnInit } from '@angular/core';
import {routesService} from '../../services/routesService';
import {TravelGroup} from '../../models/travel-group';

@Component({
  selector: 'app-mis-grupos',
  templateUrl: './mis-grupos.page.html',
  styleUrls: ['./mis-grupos.page.scss'],
})
export class MisGruposPage implements OnInit {


  constructor(private service: routesService) { }
 
  existe: Boolean;
  id: string = "5dbdc125f2c6a91b808a8033";
  travelGroup : TravelGroup;
  protected listaTravelGroups: TravelGroup[] = [];
  addInTravelGroup: TravelGroup;
 


  ngOnInit() {
this.getListaTravelGroups();
  }


  getListaTravelGroups()
  {
    this.service.getTravelGroups()
    .subscribe((res) => {

      res.forEach(element =>{

        this.existe = false;

        element.users.forEach(stringUser => {
            
          if (this.id == stringUser)
          {
            this.existe = true;
          }

        })
        if (this.existe)
        {
          console.log("Se AÑADE EN LISTA", element);
          this.listaTravelGroups.push(element);
        }
        else {
          
          console.log("NO LISTA");
         
        }

      })
     }),((error) => {
        console.log(error);
     });
  }




}
