import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(users: User[], texto: string): User[] {
    if (texto.length === 0) {
      return users;
    }

    texto = texto.toLocaleLowerCase();

    return users.filter( usuario => {
      return usuario.username.toLocaleLowerCase().includes(texto);
    });


  }

}
