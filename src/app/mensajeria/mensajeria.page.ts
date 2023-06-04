import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.page.html',
  styleUrls: ['./mensajeria.page.scss'],
})
export class MensajeriaPage implements OnInit {
  pacienteId!: number;
  pacienteName!: string;
  mensajes: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pacienteId = params['id'];
      this.loadMensajes();
    });
  }

  loadMensajes() {
    // Realiza la solicitud a tu API para obtener los mensajes
    this.http.get<any[]>(`http://localhost:3000/mensajeria/${this.pacienteId}`).subscribe(
      response => {
        this.mensajes = response.map(respuesta => respuesta);
        this.pacienteName = response[0].Nombre;
      },
      error => {
        console.log('Error al obtener los mensajes:', error);
      }
    );
  }

}
