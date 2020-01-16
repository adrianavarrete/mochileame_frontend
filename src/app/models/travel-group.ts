export class TravelGroup {
    _id: string;
    name: string;
    destination: string;
    maxNumUsers: number;
    users: string [];
    privacity: boolean;
    travelDateInit: Date;
    travelDateFin: Date;
    gender: string;
    hobbies: [string];
    createdBy: string;
    dateOfCreation: Date;
    path: string;
    constructor(
        _id = '',
        name = '',
        destination = '',
        maxNumUsers = null,
        users =  [],
        privacity = false,
        travelDateInit = null,
        travelDateFin = null,
        gender = '',
        hobbies = null,
        createdBy = '',
        dateOfCreation = null,
        path =''    
    ) {

        this._id = _id;
        this.name = name;
        this.destination = destination;
        this.maxNumUsers = maxNumUsers;
        this.users = users;
        this.privacity = privacity;
        this.travelDateInit = travelDateInit;
        this.travelDateFin = travelDateFin;
        this.gender = gender;
        this.hobbies = hobbies;
        this.createdBy = createdBy;
        this.dateOfCreation = dateOfCreation;
        this.path = path;

    }
}
