import { Component, OnInit } from '@angular/core';
import { routesService } from '../../services/routesService';
import { HttpClientModule } from '@angular/common/http';
import { element } from 'protractor';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import {Foro} from '../../models/foro';
import { ForoService } from 'src/app/services/foro.service';


@Component({
  selector: 'app-foro',
  templateUrl: './foro.page.html',
  styleUrls: ['./foro.page.scss'],
})
export class ForoPage implements OnInit {


  constructor(private service: ForoService, private route: ActivatedRoute,  private router: Router) { }

  
  existe: Boolean;
  token: string = localStorage.getItem('idUser');
  id: string;
  listaforo: Foro[] = []
  name: any;
  destination: any;



  ngOnInit() {
    this.id = localStorage.getItem('idUser');
    this.getPosts();
 
  }
  
  goCrearpost() {
    this.router.navigateByUrl('/creartema');
  }


  getPosts() {

    this.listaforo = [];
    this.service.getPosts()
      .subscribe((res) => {

        res.forEach(element => {

            this.listaforo.push(element);
          

        })


      }), ((error) => {
        console.log(error);
      });
  }


  goHome()
   {
    this.router.navigateByUrl('/home');
   }

  
 
  goToPost(foro: Foro)
  {
    localStorage.setItem("idforo", foro._id);
    this.router.navigateByUrl('/post');
  }

  
}


