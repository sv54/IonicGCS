import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.page.html',
  styleUrls: ['./mensajeria.page.scss'],
})
export class MensajeriaPage implements OnInit {
  mensajeTexto!: string;
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
    // Realizamos la solicitud a tu API para obtener los mensajes
    this.http.get<any[]>(`http://localhost:3000/mensajeria/${this.pacienteId}`).subscribe(
      response => {
        if (response[0].hasOwnProperty('Mensaje')){
          this.mensajes = response.map(respuesta => respuesta);
          this.pacienteName = response[0].Paciente;
        } 
        else {
          this.pacienteName = response[0].Paciente;
        }
      },
      error => {
        console.log('Error al obtener los mensajes:', error);
      }
    );
  }

  enviarMensaje() {
    // Creamos el objeto de datos para enviar en el cuerpo de la solicitud POST
    const datos = {
      mensaje: this.mensajeTexto
    };

    // Realizamos la solicitud POST a la API
    this.http.post<any>(`http://localhost:3000/mensajeria/${this.pacienteId}`, datos).subscribe(
      response => {
        // Manejamos la respuesta de la API
        console.log('Respuesta de la API:', response);
        this.loadMensajes();
      },
      error => {
        // Manejamos el error de la API
        console.error('Error al enviar el mensaje:', error);
      }
    );
  }

}
