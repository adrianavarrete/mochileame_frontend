import { Injectable } from '@angular/core';
<<<<<<< HEAD
import {HttpClient} from '@angular/common/http'
import { User } from '../models/user';
import { Observable } from 'rxjs';


=======
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
>>>>>>> 8b69a66e656e9be5d7d7d68a1fa6d55790c047ca

@Injectable({
  providedIn: 'root'
})
export class UserService {

<<<<<<< HEAD
  usuarios: User[];
  userNew: User;
  readonly URL_API = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getUsuario(_id: String):Observable<User>
  {
    return this.http.get<User>(this.URL_API + `/${_id}`);
  }
  
  login(name: string, pass: string):Observable<User>{
    console.log("name: "+ name)
    console.log("pass: "+ pass)
    this.userNew = new User();
    this.userNew.username = name;
    
    this.userNew.password = pass;
    return this.http.post<User>(this.URL_API+ '/login', this.userNew);








  }

=======
  readonly URL_API = 'http://localhost:3000/user';
  selectedUser: User;
  users: User[];


  constructor(private http: HttpClient) { }

  updateUser(user: User) {
    console.log(user);
    return this.http.put(this.URL_API + `/updateUser/${user._id}`, user);

  }
>>>>>>> 8b69a66e656e9be5d7d7d68a1fa6d55790c047ca
}


