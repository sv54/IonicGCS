import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {

  notificaciones: any = []


  constructor(private router: Router, private storage: StorageService, private http: HttpClient) { }

  ngOnInit() {
  }

  async getNotificaciones(){
    let idMedico =
    await this.storage.get('dni')?.then((value) => {
      this.http.get('http://localhost:3000/notificaciones')
      .subscribe(data => {

      })
      idMedico = value;
    })


  }


  redirectChat(notificacion: any){
    console.log(notificacion)
    const requestBody = {

    };
  }


}
