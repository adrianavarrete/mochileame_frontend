import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user = new User();
  myUser = new User();
  username = localStorage.getItem('usernameToFollow');
  following: boolean;


  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserByUsername(this.username);
    this.checkFollowing(localStorage.getItem('idUser'));

  }

  getUser(idUser: string) {
    this.userService.getUsuario(idUser)
      .subscribe(res => {
        console.log(res);
        this.user = res;
        console.log(this.user);

      });

  }

  checkFollowing(myId: string) {
    this.userService.getUsuario(myId)
      .subscribe(res => {
        console.log(res);
        this.myUser = res;
        console.log(this.user);

      });

    console.log(this.myUser.following);

    if (this.myUser.following === null) {
      this.following = false;
    } else {
      this.myUser.following.forEach(element => {
        if (element === this.user._id) {
          this.following = true;
        } else {
          this.following = false;
        }
      });
    }

    console.log(this.following);

  }

  getUserByUsername() {
    this.userService.getUserByUsername(this.username)
      .subscribe(res => {
        console.log(this.username);
        console.log(res);
        this.user = res;
      })
  }

  follow() {

  }

  unfollow() {

  }

}
