import { Component, OnInit } from '@angular/core';
import {routesService} from '../../services/routesService';
import { HttpClientModule } from '@angular/common/http';



@Component({
  selector: 'app-loguin',
  templateUrl: './loguin.page.html',
  styleUrls: ['./loguin.page.scss'],
})
export class LoguinPage implements OnInit {


  constructor(private service: routesService) { }
  

  ngOnInit(
    
  ) {
  }

}
