import { Component, OnInit } from '@angular/core';
import {routesService} from '../../services/routesService';
import {TravelGroup} from '../../models/travel-group';
import { HttpClientModule } from '@angular/common/http';
import { element } from 'protractor';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  constructor(private service: routesService) { }
 
  existe: Boolean;
  id: string = "";
  travelGroup : TravelGroup;
  protected listaTravelGroups: TravelGroup[] = [];
  addInTravelGroup: TravelGroup;
  addUSerAddInTheGroup: TravelGroup;


  ngOnInit() {
this.getListaTravelGroups();
  }

  addUserInGroup(addUserTravelGroup : TravelGroup)
  {
    this.addInTravelGroup = addUserTravelGroup;
    this.addInTravelGroup.users.push(this.addInTravelGroup._id);

    this.addUSerAddInTheGroup = new TravelGroup();
    this.addUSerAddInTheGroup.name = this.id;

    this.service.addUserInGroup(this.addUSerAddInTheGroup, this.addInTravelGroup._id)
    .subscribe((res) =>{

      console.log(res);
      this.getListaTravelGroups;

    }),((error) => {
      console.log(error);
   });

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
          console.log("NO LISTA");
        }
        else {
          console.log("Se AÑADE EN LISTA", element);
          this.listaTravelGroups.push(element);
        }

      })
      
      
     }),((error) => {
        console.log(error);
     });
  }



}
