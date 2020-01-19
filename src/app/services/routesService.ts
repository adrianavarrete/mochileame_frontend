import {HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { TravelGroup } from '../models/travel-group';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Injectable} from '@angular/core';
 
@Injectable({
    providedIn: 'root'
})
 

 
export class routesService {
 
    constructor(private http: HttpClient){}
    
    readonly URL_API = 'http://147.83.7.155:3000';
 
 
    getTravelGroups():Observable<TravelGroup[]>{
        
        return this.http.get<TravelGroup []>(this.URL_API +'/travelgroup')
    }
 
    addUserInGroup(travelGroup : TravelGroup, id :string){
 
        return this.http.put(this.URL_API + '/travelAddUser' + `/${id}`, travelGroup)
    }
 
    delUserInGroup(travelGroup : TravelGroup, id :string){
 
        return this.http.put(this.URL_API + '/travelDelUser' + `/${id}`, travelGroup)
    }
 

    
    getTravelGroup():Observable<TravelGroup>
    {   const id = localStorage.getItem('idTravelGroup');
        return this.http.get<TravelGroup>(this.URL_API + "/travelgroup" + `/${id}`);
    
}
 
creargrupo(travelgrup: TravelGroup): Observable<TravelGroup>{
 
    return this.http.post<TravelGroup>(this.URL_API + '/travelgroup', travelgrup);
 
 
}


getFoto(url)
{
    return this.http.get(this.URL_API + '/'+ url, { responseType: 'blob' });
   // http://localhost:3000/uploads/dsffs.jpg
}

cambioPath(path)
{

    //travelgroupPath
    return this.http.put(this.URL_API + '/travelgroupPath', path);

}

postFoto(formData){
  
    return this.http.post(this.URL_API + '/foto', formData);


     // this.http.post('url/to/your/api', formData)
    //   .subscribe(res => {
    //     console.log(res);
    //     this.uploadedFilePath = res.data.filePath;
    //     alert('SUCCESS !!');
    //   })
}

 
}
