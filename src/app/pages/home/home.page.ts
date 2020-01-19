import { Component, OnInit } from '@angular/core';
import { routesService } from '../../services/routesService';
import { TravelGroup } from '../../models/travel-group';
import { HttpClientModule } from '@angular/common/http';
import { element } from 'protractor';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';




//import {MisGruposPage} from '../mis-grupos/mis-grupos.page'

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  constructor(private service: routesService, private route: ActivatedRoute,  private router: Router) { }
  //private misGrupos: MisGruposPage

  existe: Boolean;
  token: string = localStorage.getItem('idUser');
  id: string;
  travelGroup: TravelGroup;
  listaTravelGroups: TravelGroup[] = [];
  addInTravelGroup: TravelGroup;
  addUSerAddInTheGroup: TravelGroup;
  show: Boolean;
  listaTravelGroupsBackup: TravelGroup[] = [];
  listaTravelGroupsFilter: TravelGroup[] = [];
  name: any;
  destination: any;
  gender: any;
  hobbies: any;


  ngOnInit() {
    // this.id = localStorage.getItem('idUser');
    // this.getListaTravelGroups();
    // this.listaTravelGroupsBackup = this.listaTravelGroups;
    // this.show = true;
  }

  
 
  ionViewWillEnter(){
    this.id = localStorage.getItem('idUser');
    this.getListaTravelGroups();
    this.listaTravelGroupsBackup = this.listaTravelGroups;
    this.show = true;
    }

  
  goCreargrupo() {
    this.router.navigateByUrl('/creargrupo');
  }

  goForo()
  {
    this.router.navigateByUrl('/foro');
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


  showFunc(){
    if (this.show == true){ this.show = false;}
    else {this.show = true;}
  }

  filterFunction(form: NgForm)
  {
   this.listaTravelGroupsFilter = [];

   if (form.value.name == "" || form.value.name == null || form.value.name == undefined)
   {
     form.value.name = "";
   }
   if (form.value.destination == "" || form.value.destination == null || form.value.destination == undefined)
   {
     form.value.destination = "";
   }
   if (form.value.gender == "" || form.value.gender == null || form.value.gender == undefined)
   {
     form.value.gender = "";
   }
   if (form.value.hobbies == "" || form.value.hobbies == null || form.value.hobbies == undefined)
   {
     form.value.hobbies = "";
   }
 
  if (form.value.name == "" && form.value.destination == "" && form.value.gender == "" && form.value.hobbies == "")
  {
 this.listaTravelGroups = this.listaTravelGroupsBackup;
  }  
 
   else{
     this.listaTravelGroups.forEach(travel => {
             
       if (form.value.name != null && form.value.name == travel.name)
       {
         this.listaTravelGroupsFilter.push(travel);
       }
 
       if (form.value.destination != null && form.value.destination == travel.destination)
       {
         this.listaTravelGroupsFilter.push(travel);
       }
 
       if (form.value.gender != null && form.value.gender == travel.gender)
       {
         this.listaTravelGroupsFilter.push(travel);
       }
 
       if (form.value.hobbies != null && form.value.hobbies == travel.hobbies)
       {
         this.listaTravelGroupsFilter.push(travel);
       }
   })
 
   this.listaTravelGroups = this.listaTravelGroupsFilter;
 
 
   }
   this.showFunc();
  }
 
  goToDetail(travelGroup: TravelGroup)
  {
    localStorage.setItem("idTravelGroup", travelGroup._id);
    this.router.navigateByUrl('/grupo-detail');
  }

}


