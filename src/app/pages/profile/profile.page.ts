import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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
  score: number;
  totalScores: number;
  iScored: boolean;


  constructor(private userService: UserService, private route: ActivatedRoute, private router: Router) {
    route.params.subscribe(val => { // necesario para poder volver a ejecutar ngoninit al volver de otra pagina
      this.getUsuarioByUsername(this.username);
      this.checkFollowing(localStorage.getItem('idUser'));
      this.getUser(localStorage.getItem('idUser'));
      this.checkScore(this.username);
      this.checkIfIScored(this.username);

    });
  }

  ngOnInit() {
    this.getUsuarioByUsername(this.username);
    this.getUser(localStorage.getItem('idUser'));
    this.checkFollowing(localStorage.getItem('idUser'));
    this.checkScore(this.username);
    this.checkIfIScored(this.username);


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
          this.userService.getUserByUsername(this.username)
            .subscribe(ress => {
              res.following.forEach(element => {
                console.log(element + "==" + ress._id);
                if (element === ress._id) {
                  this.following = true;
                  console.log(this.following);
                }
              });
            });

        }
        this.myUser = res;
      });
    console.log(this.following);

  }

  checkIfIScored(user: string) {
    this.iScored = false;

    this.userService.getUserByUsername(user)
      .subscribe(res => {
        console.log(res);
        this.user = res;
        if (this.user.score.length === 0) {
          this.iScored = false;
          console.log("iScored es false");
        } else {
          this.user.score.forEach(element => {
            if (element.key === this.myUser._id) {
              this.iScored = true;
              console.log("iScored es true");
            }
          });
        }

      });
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

  pushScore(form: NgForm) {
    let provisionalIndex = -1;
    let finalIndex = 0;

    if (this.iScored === false) {
      if (this.user.score == null) {
        this.user.score = [];
      }

      this.user.score.push({
        key: this.myUser._id,
        value: form.value.score
      });
      console.log(this.user.score[0].key, this.user.score[0].value);
    } else {
      this.user.score.forEach(element => {
        if (element.key === this.myUser._id) {
          finalIndex = provisionalIndex + 1;
        }
        provisionalIndex += 1;
      });

      this.user.score.splice(finalIndex, 1);

      this.user.score.push({
        key: this.myUser._id,
        value: form.value.score
      });

    }

    this.userService.updateUser(this.user)
      .subscribe(res => {
        console.log(res);
        this.user = res;
      });

    this.goProfile();
  }

  checkScore(user: string) {
    let number = 0;
    let totalScores = 0;
    this.userService.getUserByUsername(user)
      .subscribe(res => {
        console.log(res.score.length);
        this.user = res;
        console.log(this.user.score.length);

        if (this.user.score.length === 0) {
          this.score = null;
          console.log('No tiene puntuación');
        } else {
          totalScores = this.user.score.length;
          this.user.score.forEach(element => {
            number += element.value;
          });

          this.score = number / totalScores;
          console.log('La puntuación es de' + this.score);
        }
        console.log(this.score);

      });

  }
  goProfile() {
    this.router.navigateByUrl('/tabs/tab3');
  }

}
