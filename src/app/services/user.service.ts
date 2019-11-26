import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from '../models/user';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {

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

}
