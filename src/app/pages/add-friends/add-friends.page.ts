import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.page.html',
  styleUrls: ['./add-friends.page.scss'],
})
export class AddFriendsPage implements OnInit {

  users: User[] = [];
  textSearch = '';
  idUser: string;

  constructor(private userService: UserService, private router: Router) {
    this.userService.getUsers()
      .subscribe(res => this.users = res);
  }

  ngOnInit() {
    this.idUser = localStorage.getItem('idUser');

  }

  findUser(event) {
    const text = event.target.value;
    this.textSearch = text;

    console.log(text);

  }

  goUserProfile(username: string) {

    localStorage.setItem('usernameToFollow', username);
    this.router.navigateByUrl('/profile');

  }

}
