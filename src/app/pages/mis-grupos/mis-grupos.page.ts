import { Component, OnInit } from '@angular/core';
import { routesService } from '../../services/routesService';
import { TravelGroup } from '../../models/travel-group';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";

@Component({
  selector: 'app-mis-grupos',
  templateUrl: './mis-grupos.page.html',
  styleUrls: ['./mis-grupos.page.scss'],
})
export class MisGruposPage implements OnInit {


  constructor(private alertCtrl: AlertController, private menu: MenuController, private service: routesService, private router: Router) { }

  existe: Boolean;
  id: string;
  travelGroup: TravelGroup;
  listaTravelGroups: TravelGroup[] = [];
  listaTravelGroupsBackup: TravelGroup[] = [];
  listaTravelGroupsFilter: TravelGroup[] = [];
  addInTravelGroup: TravelGroup;
  listhobbies: ["a", "b", "c"];
  filter: Boolean;
  show: Boolean;
  name: any;
  destination: any;
  gender: any;
  hobbies: any;



  ngOnInit() {
    this.id = localStorage.getItem('idUser');
    this.getListaTravelGroups();
    this.show = true;
    this.listaTravelGroupsBackup = this.listaTravelGroups;
  }

  showFunc() {
    if (this.show == true) { this.show = false; }
    else { this.show = true; }

  }

  filterFunction(form: NgForm) {
    this.listaTravelGroupsFilter = [];


    if (form.value.name == "" || form.value.name == null || form.value.name == undefined) {
      form.value.name = "";
    }
    if (form.value.destination == "" || form.value.destination == null || form.value.destination == undefined) {
      form.value.destination = "";
    }
    if (form.value.gender == "" || form.value.gender == null || form.value.gender == undefined) {
      form.value.gender = "";
    }
    if (form.value.hobbies == "" || form.value.hobbies == null || form.value.hobbies == undefined) {
      form.value.hobbies = "";
    }

    if (form.value.name == "" && form.value.destination == "" && form.value.gender == "" && form.value.hobbies == "") {
      this.listaTravelGroups = this.listaTravelGroupsBackup;
    }

    else {
      this.listaTravelGroups.forEach(travel => {

        if (form.value.name != null && form.value.name == travel.name) {
          this.listaTravelGroupsFilter.push(travel);
        }

        if (form.value.destination != null && form.value.destination == travel.destination) {
          this.listaTravelGroupsFilter.push(travel);
        }

        if (form.value.gender != null && form.value.gender == travel.gender) {
          this.listaTravelGroupsFilter.push(travel);
        }

        if (form.value.hobbies != null && form.value.hobbies == travel.hobbies) {
          this.listaTravelGroupsFilter.push(travel);
        }
      })

      this.listaTravelGroups = this.listaTravelGroupsFilter;


    }
    this.showFunc();
  }

  getListaTravelGroups() {
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
            console.log("Se AÑADE EN LISTA", element);
            this.listaTravelGroups.push(element);
          }
          else {

            console.log("NO LISTA");

          }

        })
      }), ((error) => {
        console.log(error);
      });
  }

  goToDetail(travelGroup: TravelGroup) {

    localStorage.setItem("idTravelGroup", travelGroup._id);
    this.router.navigateByUrl('/grupo-detail');
  }



}
