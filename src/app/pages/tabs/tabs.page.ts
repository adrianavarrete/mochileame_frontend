import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {


  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    route.params.subscribe(val => { // necesario para poder volver a ejecutar ngoninit al volver de otra pagina
      this.getUser(localStorage.getItem('idUser'));
    });
  }

  getUser(idUser: string) {
    this.userService.getUsuario(idUser)
      .subscribe(res => {
        console.log(res);
        localStorage.setItem('user', res.username);

      });

  }



  ngOnInit() {
  }

}
