import { Component, OnInit } from '@angular/core';
import { routesService } from '../../services/routesService';
import { TravelGroup } from '../../models/travel-group';
import { HttpClientModule } from '@angular/common/http';
import { element } from 'protractor';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { NgForm } from '@angular/forms';
//import {MisGruposPage} from '../mis-grupos/mis-grupos.page'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  constructor(private service: routesService) { }
  //private misGrupos: MisGruposPage

  existe: Boolean;
  token: string = localStorage.getItem('idUser');
  id: string;
  travelGroup: TravelGroup;
  listaTravelGroups: TravelGroup[] = [];
  addInTravelGroup: TravelGroup;
  addUSerAddInTheGroup: TravelGroup;


  ngOnInit() {
    this.id = localStorage.getItem('idUser');
    this.getListaTravelGroups();
  }

  addUserInGroup(addUserTravelGroup: TravelGroup) {
    this.addInTravelGroup = addUserTravelGroup;
    this.addInTravelGroup.users.push(this.addInTravelGroup._id);

    this.addUSerAddInTheGroup = new TravelGroup();
    this.addUSerAddInTheGroup.name = this.id;

    this.service.addUserInGroup(this.addUSerAddInTheGroup, this.addInTravelGroup._id)
      .subscribe((res) => {

        console.log(res);
        this.getListaTravelGroups();
        // this.misGrupos.getListaTravelGroups();

      }), ((error) => {
        console.log(error);
      });



  }

  getListaTravelGroups() {

    this.listaTravelGroups = [];
    this.service.getTravelGroups()
      .subscribe((res) => {

        res.forEach(element => {

          this.existe = false;

          element.users.forEach(stringUser => {

            if (this.id == stringUser) {
              this.existe = true;
            }

          })
          if (this.existe) {
            console.log("NO LISTA");
          }
          else {
            console.log("Se AÑADE EN LISTA", element);
            this.listaTravelGroups.push(element);
          }

        })


      }), ((error) => {
        console.log(error);
      });
  }



}
