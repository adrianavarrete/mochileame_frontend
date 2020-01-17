export class Foro{

         
    _id: string;
    creador: string;
    titulo:string;
    estado: string; 
    mensajes: string [];
    path: string;
    
   
    constructor(
        _id = '',
        creador = '',
        titulo = '',
        estado = '',
        mensajes = [],
        path = ''
        

    ) {

        this._id = _id;
        this.creador = creador;
        this.titulo = titulo;
        this.estado = estado;
        this.mensajes = mensajes;
        this.path = path;
 

    }
}

