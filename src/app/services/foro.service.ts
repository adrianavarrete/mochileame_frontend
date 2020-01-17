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
    return this.http.put<Foro>(this.URL_API + '/post'+`/${foro._id}`, foro);
  }

  postPost(foro: Foro) {
    console.log(foro);
    return this.http.post<Foro>(this.URL_API + '/post', foro);
  }

  getFoto(url)
{
    return this.http.get('http://localhost:3000' + '/'+ url, { responseType: 'blob' });
   // http://localhost:3000/uploads/dsffs.jpg
}

cambioPath(path)
{

    //travelgroupPath
    return this.http.put(this.URL_API + '/foto', path);

}

postFoto(formData){
  
    return this.http.post('http://localhost:3000'  + '/foto2', formData);


     // this.http.post('url/to/your/api', formData)
    //   .subscribe(res => {
    //     console.log(res);
    //     this.uploadedFilePath = res.data.filePath;
    //     alert('SUCCESS !!');
    //   })
}

}






