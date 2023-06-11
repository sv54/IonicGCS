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
  medicoId: any;

  constructor(private router: Router, private storage: StorageService, private http: HttpClient) { }

  ngOnInit() {
    this.getNotificaciones()
  }

  async getNotificaciones() {
    console.log("fetching");
    this.medicoId = await this.storage.get('id')?.then((value) => {

    this.http.get<any[]>('http://localhost:3000/notificaciones/'+value)
      .subscribe(
        data => {
          this.notificaciones = data;
          console.log('Notificaciones:', this.notificaciones);
        },
        error => {
          console.error('Failed to fetch notificaciones:', error);
        }
      );
    });
  }


  redirectChat(notificacion: any){
    console.log(notificacion)
    const requestBody = {

    };
  }


}
