import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  myUser: User;
  users: User[] = [];
  idUser = localStorage.getItem('idUser');
  followers: any = [];
  followings: any = [];

  constructor(private router: Router, private route: ActivatedRoute, private userService: UserService) {
    route.params.subscribe(val => { // necesario para poder volver a ejecutar ngoninit al volver de otra pagina
      this.getFollowersAndFollowings(this.idUser);
    });
  }

  ngOnInit() {
    this.getFollowersAndFollowings(this.idUser);

  }

  goAddFriends() {
    this.router.navigateByUrl('/add-friends');
  }

  getFollowersAndFollowings(idUser: string) {
    this.userService.getFriends(idUser)
      .subscribe(res => {
        console.log(res);
        this.followers = res.followers;
        this.followings = res.following;
      });

    this.userService.getUsuario(idUser)
      .subscribe(res => {
        console.log(res);
        this.myUser = res;
      });

  }


  goUserProfile(username: string) {

    localStorage.setItem('usernameToFollow', username);
    this.router.navigateByUrl('/profile');

  }


}
