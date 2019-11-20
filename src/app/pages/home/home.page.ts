import { Component, OnInit } from '@angular/core';
import {routesService} from '../../services/routesService';
import {TravelGroup} from '../../models/travel-group';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  constructor(private service: routesService) { }
 

  listaTravelGroups: TravelGroup[];
  ngOnInit() {

    
this.getListaTravelGroups();
  }


  getListaTravelGroups()
  {
    this.service.getTravelGroups()
    .subscribe((res) => {
      this.listaTravelGroups = res;
     }),((error) => {
        console.log(error);
     });
  }



}
