import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { TravelGroup } from '../models/travel-group';
import {Foro} from '../models/foro';


@Injectable({
  providedIn: 'root'
})
export class ForoService {

  foro: Foro;
  travelgrup: TravelGroup;
  userNew: User;
  users: User[];
  readonly URL_API = 'http://localhost:3000/foro';

  constructor(private http: HttpClient) { }

  getPost(_id: String): Observable<Foro> {
    return this.http.get<Foro>(this.URL_API + `/${_id}`);
  }

  

 
  getPosts(): Observable<Foro[]> {
    return this.http.get<Foro[]>(this.URL_API);
  }

  
  updatePost(foro: Foro): Observable<Foro> {
    console.log(foro);
    return this.http.put<Foro>(this.URL_API + `/post/${foro._id}`, foro);
  }

  postPost(foro: Foro) {
    console.log(foro);
    return this.http.post(this.URL_API + '/post', foro);
  }

}






