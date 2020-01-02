import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { routesService } from '../../services/routesService';
import { TravelGroup } from '../../models/travel-group';
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.page.html',
  styleUrls: ['./myprofile.page.scss'],
})
export class MyprofilePage implements OnInit, OnDestroy {

  user = new User('', '', '', '', '', '', '', '', '', '', '', '', '', '');
  idUser = localStorage.getItem('idUser');
  existe: Boolean;
  travelGroup: TravelGroup;
  listaTravelGroups: TravelGroup[] = [];
  groupActual: TravelGroup = new TravelGroup;
  delUserInTravelGroup: TravelGroup;
  nodelfolower: String[] = [];
  nodelfolowing: String[] = [];
  usuarionew = new User;



  constructor(public userService: UserService, private router: Router, private route: ActivatedRoute, private service: routesService) {
    route.params.subscribe(val => { // necesario para poder volver a ejecutar ngoninit al volver de otra pagina
      this.getUser(this.idUser);
    });
  }

  ngOnInit() {
    this.getUser(this.idUser);
    this.getListaTravelGroups();


  }

  ngOnDestroy() {
    console.log("Cambiar tab");
  }

  getUser(idUser: string) {
    this.userService.getUsuario(idUser)
      .subscribe(res => {
        console.log(res);
        this.user = res;
        console.log(this.user);

      });

  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
    }
  }

  goProfile() {
    this.router.navigateByUrl('/profile-details');
  }

  goFriends() {
    this.router.navigateByUrl('/friends');
  }


  logout() {
    localStorage.removeItem("idUser");
    this.router.navigateByUrl('/login');
  }

  getListaTravelGroups() {
    this.service.getTravelGroups()
      .subscribe((res) => {

        res.forEach(element => {

          this.existe = false;

          element.users.forEach(stringUser => {

            if (this.idUser == stringUser) {
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



 delete(){

  this.delUserInTravelGroup = new TravelGroup();
  this.listaTravelGroups.forEach(grupo => {

    grupo.users.forEach(stringUser => {

      if (this.idUser != stringUser) {
        this.delUserInTravelGroup.users.push(stringUser);
      }

  });

  
  this.service.delUserInGroup(this.delUserInTravelGroup, grupo._id)
    .subscribe((res) => {

      console.log(res);

    }), ((error) => {
      console.log(error);
    });

});
if(this.user.followers != null){
 this.user.followers.forEach(follower => {
 this.userService.getUsuario(follower)  
 .subscribe((res) => {
  this.dejardeseguirme(res);
  console.log(res);

}), ((error) => {
  console.log(error);
});

});
 }
  
if(this.user.following != null){
this.user.following.forEach(following => {
  this.userService.getUsuario(following)  
  .subscribe((res) => {
   this.dejardeseguirme(res);
   console.log(res);
 
 }), ((error) => {
   console.log(error);
 });
 });
}

 this.userService.delete(this.user)
.subscribe(res => {
  console.log(res);
  this.user = res;
  this.router.navigateByUrl("");

});

  }

  dejardeseguirme(user : User){


    let nodelfolowing: [string] = [""];
    let nodelfolower: [string] = [""];
    
    nodelfolower.pop();
    nodelfolowing.pop();

  user.following.forEach(following => {

    if (this.idUser != following) {
      nodelfolowing.push(following);
      
    }
  });

    user.followers.forEach(followers => {

      if (this.idUser != followers) {
        nodelfolower.push(followers);
      }

    });

      user.followers = nodelfolowing;
      user.following = nodelfolower;

    
      this.userService.updateUser(user)
      .subscribe(res => {
        console.log(res);
        this.user = res;
      });
  

  }


}


