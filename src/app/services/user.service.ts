import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly URL_API = 'http://localhost:3000/user';
  selectedUser: User;
  users: User[];


  constructor(private http: HttpClient) { }

  updateUser(user: User) {
    console.log(user);
    return this.http.put(this.URL_API + `/updateUser/${user._id}`, user);

  }
}


