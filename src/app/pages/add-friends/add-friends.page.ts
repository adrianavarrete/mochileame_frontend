import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-add-friends',
  templateUrl: './add-friends.page.html',
  styleUrls: ['./add-friends.page.scss'],
})
export class AddFriendsPage implements OnInit {

  users: User[] = [];
  textSearch = '';

  constructor(private userService: UserService) {
    this.userService.getUsers()
      .subscribe(res => this.users = res);
  }

  ngOnInit() {
  }

  findUser(event) {
    const text = event.target.value;
    this.textSearch = text;

    console.log(text);

  }

}
