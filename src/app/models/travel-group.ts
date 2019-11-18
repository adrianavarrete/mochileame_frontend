export class TravelGroup {
    _id: string;
    username: string;
    mail: string;
    password: string;
    name: string;
    lastname: string;
    dateofbirth: Date;
    gender: string;
    nationality: string;
    photo: string;
    biography: string;
    hobbies: [string];
    friends: [string];

    //------------- Comento los atributos que a día de hoy no son requeridos en mongoose ---------------//

    constructor(
        _id = '',
        username = '',
        mail = '',
        password = '',
        //name= '',
        //lastname= '',
        //dateofbirth= null,
        //gender= '',
        //nationality= '',
        //photo= '',
        // biography= '',
        //hobbies= null,
        //friends= null
    ) {

        this._id = _id;
        this.username = username;
        this.mail = mail;
        this.password = password;
        //this.name = name;
        //this.lastname = lastname;
        //this.dateofbirth = dateofbirth;
        //this.gender = gender;
        //this.nationality = nationality;
        //this.photo = photo;
        //this.biography = biography;
        //this.hobbies = hobbies;
        //this.friends = friends;

    }
}
