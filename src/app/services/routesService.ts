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
    
    readonly URL_API = 'http://localhost:3000';


    getTravelGroups():Observable<TravelGroup[]>{
        
        return this.http.get<TravelGroup []>(this.URL_API +'/travelgroup')
    }

    addUserInGroup(travelGroup : TravelGroup, id :string){

        return this.http.put(this.URL_API + '/travelAddUser' + `/${id}`, travelGroup)
    }

    getTravelGroup():Observable<TravelGroup>
    {   const id = localStorage.getItem('idTravelGroup');
        return this.http.get<TravelGroup>(this.URL_API + "/travelgroup" + `/${id}`);
    
}



creargrupo(travelgrup: TravelGroup): Observable<TravelGroup>{

    return this.http.post<TravelGroup>(this.URL_API + '/travelgroup', travelgrup);


}

}
