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
        
        return this.http.get<TravelGroup []>(this.URL_API +'/travelgroups')
    }

}