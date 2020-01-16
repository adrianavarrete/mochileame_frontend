import { Score } from './score';

export class User {
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
    followers: [string];
    following: [string];
    score: Score[];

    constructor(
        _id = '',
        username = '',
        mail = '',
        password = '',
        name = '',
        lastname = '',
        dateofbirth = null,
        gender = '',
        nationality = '',
        photo = '',
        biography = '',
        hobbies = null,
        followers = null,
        following = null,
        score = null,


    ) {

        this._id = _id;
        this.username = username;
        this.mail = mail;
        this.password = password;
        this.name = name;
        this.lastname = lastname;
        this.dateofbirth = dateofbirth;
        this.gender = gender;
        this.nationality = nationality;
        this.photo = photo;
        this.biography = biography;
        this.hobbies = hobbies;
        this.followers = followers;
        this.following = following;
        this.score = score;

    }
}
