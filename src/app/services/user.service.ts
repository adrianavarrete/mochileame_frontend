import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { TravelGroup } from '../models/travel-group';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  travelgrup: TravelGroup;
  userNew: User;
  users: User[];
  readonly URL_API = 'http://localhost:3000/user';

  constructor(private http: HttpClient) { }

  getUsuario(_id: String): Observable<User> {
    return this.http.get<User>(this.URL_API + `/${_id}`);
  }

  getFriends(_id: String): Observable<User> {
    return this.http.get<User>(this.URL_API + `/${_id}/friends`);
  }

  getUserByUsername(username: String): Observable<User> {
    return this.http.get<User>(this.URL_API + `/username/${username}`);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.URL_API);
  }

  login(name: string, pass: string) {
    console.log("name: " + name)
    console.log("pass: " + pass)
    this.userNew = new User();
    this.userNew.username = name;

    this.userNew.password = pass;
    return this.http.post(this.URL_API + '/login ', this.userNew);
  }
  updateUser(user: User): Observable<User> {
    console.log(user);
    return this.http.put<User>(this.URL_API + `/updateUser/${user._id}`, user);
  }

  register(user: User) {
    console.log(user);
    return this.http.post(this.URL_API + '/postuser/', user);
  }
  delete(user: User): Observable<User> {

    return this.http.delete<User>(this.URL_API + `/deleteuser/${user._id}`)


  }

}






