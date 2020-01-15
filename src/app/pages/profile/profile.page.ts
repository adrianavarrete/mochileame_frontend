import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user = new User();
  myUser = new User('', '', '', '', '', '', '', '', '', '', '', '', '', '');

  username = localStorage.getItem('usernameToFollow');
  following: boolean;
  score: number = null;
  totalScores: number;
  iScored: boolean;


  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    route.params.subscribe(val => { // necesario para poder volver a ejecutar ngoninit al volver de otra pagina
      this.getUsuarioByUsername(this.username);
      this.checkFollowing(localStorage.getItem('idUser'));
      this.getUser(localStorage.getItem('idUser'));
      this.checkScore(localStorage.getItem('idUser'));
      this.checkIfIScored();

    });
  }

  ngOnInit() {
    this.getUsuarioByUsername(this.username);
    this.getUser(localStorage.getItem('idUser'));
    this.checkFollowing(localStorage.getItem('idUser'));
    this.checkIfIScored();
    this.checkScore(localStorage.getItem('idUser'));


  }

  getUser(idUser: string) {
    this.userService.getUsuario(idUser)
      .subscribe(res => {
        console.log(res);
        this.myUser = res;
        console.log(this.myUser);

      });

  }

  checkFollowing(myId: string) {
    this.following = false;
    this.userService.getUsuario(myId)
      .subscribe(res => {
        console.log(res);
        if (res.following === null) {
          this.following = false;
        } else {
          res.following.forEach(element => {
            console.log(element);
            console.log(this.user._id);
            if (element === this.user._id) {
              this.following = true;
              console.log(this.following);
            }
          });
        }
        this.myUser = res;
      });
    console.log(this.following);

  }

  checkIfIScored() {
    this.iScored = false;
    if (this.user.whoScore === null) {
      this.iScored = false;
      console.log("iScored es false");
    } else {
      this.user.whoScore.forEach(element => {
        if (element === this.myUser._id) {
          this.iScored = true;
          console.log("iScored es true");
        }
      });
    }

  }

  checkFollowing2(myId: string) {

    this.following = false;
    this.userService.getUsuario(myId)
      .subscribe(res => {
        console.log(res);
        if (res.following === null) {
          this.following = false;
        } else {
          for (let element of res.following) {
            console.log(element);
            if (element === this.user._id) {
              this.following = true;
              console.log(this.following);
              break;
            }
          }
        }

        this.myUser = res;
      });
    console.log(this.following);

  }

  getUsuarioByUsername(username: string) {
    this.userService.getUserByUsername(username)
      .subscribe(res => {
        console.log(this.username);
        console.log(res);
        this.user = res;
      });
  }

  follow(idToFollow: string) {
    this.myUser.following.push(idToFollow);
    this.user.followers.push(this.myUser._id);
    this.userService.updateUser(this.myUser)
      .subscribe(res => {
        console.log(res);
        this.myUser = res;
      });

    this.userService.updateUser(this.user)
      .subscribe(res => {
        console.log(res);
        this.user = res;
      });
    this.router.navigateByUrl('/tabs/tab3');

  }

  ufollow(idToUnFollow: string) {
    this.myUser.following.splice(this.myUser.following.indexOf(idToUnFollow), 1);
    this.user.followers.splice(this.myUser.following.indexOf(this.myUser._id), 1);

    this.userService.updateUser(this.myUser)
      .subscribe(res => {
        console.log(res);
        this.myUser = res;
      });

    this.userService.updateUser(this.user)
      .subscribe(res => {
        console.log(res);
        this.myUser = res;
      });

    this.router.navigateByUrl('/tabs/tab3');

  }

  pushScore(idToScore: string) {
    this.userService.getUsuario(idToScore)
      .subscribe(res => {
        console.log(res);
        this.user = res;
      });
  }

  checkScore(myId: string) {
    this.iScored = false;
    if (this.user.score === null) {
      this.score = null;
    } else {
      this.totalScores = this.user.score.length;
      this.user.score.forEach(element => {

        if (element.userId === myId) {
          this.iScored = true;
          console.log(this.iScored);
        }
      });
    }
    console.log(this.following);

  }


}
