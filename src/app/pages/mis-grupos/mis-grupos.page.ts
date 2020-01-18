import { Component, OnInit } from '@angular/core';
import { routesService } from '../../services/routesService';
import { TravelGroup } from '../../models/travel-group';
import { MenuController, NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Router } from "@angular/router";
import { Socket } from 'ngx-socket-io';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-mis-grupos',
  templateUrl: './mis-grupos.page.html',
  styleUrls: ['./mis-grupos.page.scss'],
})
export class MisGruposPage implements OnInit {


  constructor(private userService: UserService,private alertCtrl: AlertController, private menu: MenuController, private service: routesService, private router: Router, private socket:Socket) { }

  user = new User('', '', '', '', '', '', '', '', '', '', '', '', '', '');
  existe: Boolean;
  id: string;
  idUser = localStorage.getItem("idUser");
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
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  fotoDelBc: any;
  imageToShow: any;
  isImageLoading: boolean;

  async ngOnInit() {
    this.id = localStorage.getItem('idUser');
    await this.getListaTravelGroups();
    this.show = true;
    this.listaTravelGroupsBackup = this.listaTravelGroups;
    await this.getImageFromService  ();
    await this.getUser(this.idUser);
  }



  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
  }

preview() {
  // Show preview 
  var mimeType = this.fileData.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }

  var reader = new FileReader();      
  reader.readAsDataURL(this.fileData); 
  reader.onload = (_event) => { 
    this.previewUrl = reader.result; 
  }
}

onSubmit() {
  const formData = new FormData();
    formData.append('file', this.fileData);
    this.service.postFoto(formData)
         .subscribe(res => {
            console.log(res);      
            alert('SUCCESS !!');
      })

      
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

  getFoto()
  {
    this.service.getFoto('/uploads/dsffs.jpg')
      .subscribe((res) => {this.fotoDelBc = res;
      this.fotoDelBc;
      })
  }



  async getImageFromService() {
    this.isImageLoading = true;
    this.service.getFoto('uploads/dsffs.jpg').subscribe(data => {
      this.createImageFromBlob(data);
      this.isImageLoading = false;
    }, error => {
      this.isImageLoading = false;
      console.log(error);
    });
}


  createImageFromBlob(image: Blob) {
     let reader = new FileReader();
     reader.addEventListener("load", () => {
        this.imageToShow = reader.result;
     }, false);
  
     if (image) {
        reader.readAsDataURL(image);
     }
  }






  async getListaTravelGroups() {
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

  async getUser(idUser: string) {
    this.userService.getUsuario(idUser)
      .subscribe(res => {
        console.log(res);
      });

  }



}
