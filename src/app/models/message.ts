export class Message{

        
    user: string;
    texto :string;
    grupo: string;
    
   
    constructor(
        
        user = '',
        texto = '',
        grupo = ''

        

    ) {

        this.user = user;
        this.texto = texto;
        this.grupo = grupo;
 

    }
}

