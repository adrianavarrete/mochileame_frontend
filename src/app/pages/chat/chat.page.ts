import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../../services/user.service';
import { Socket } from 'ngx-socket-io';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  message = '';
  messages = [];
  currentUser = '';
  idUser = localStorage.getItem("idUser");
  u = new User('', '', '', '', '', '', '', '', '', '', '', '', '', '');

 
  constructor(private userService: UserService,private socket: Socket, private toastCtrl: ToastController) { }
 
  ngOnInit() {;
     
    this.socket.connect();
    
    this.currentUser = localStorage.getItem('user');
    
    this.socket.emit('set-name', this.currentUser);
 
    this.socket.fromEvent('users-changed').subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });
 
    this.socket.fromEvent('message').subscribe(message => {
      this.messages.push(message);
    });
  }
 
  sendMessage() {
    this.socket.emit('send-message', { text: this.message });
    this.message = '';
  }
 
  ionViewWillLeave() {
    this.socket.disconnect();
  }
 
  async showToast(msg) {
    let toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      duration: 2000
    });
    toast.present();
  }
  
  async getUser(idUser: string) {
    this.userService.getUsuario(idUser)
      .subscribe(res => {
        console.log(res);
      });

  }

  
}