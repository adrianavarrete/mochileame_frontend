export class Message{

        
    user: string;
    texto :string;
    
   
    constructor(
        
        user = '',
        texto = ''
        

    ) {

        this.user = user;
        this.texto = texto;
 

    }
}

