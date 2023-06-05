import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-mensajeria-listado',
  templateUrl: './mensajeria-listado.page.html',
  styleUrls: ['./mensajeria-listado.page.scss'],
})

export class MensajeriaListadoPage implements OnInit {
  pacientes: any[] = [];

  filteredPacientes: any[] = [];

  searchFilter: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>('http://localhost:3000/mensajeria-listado').subscribe(
      response => {
        // Procesar la respuesta JSON y obtener los nombres de los pacientes
        const pacientes = response.map(paciente => paciente);

        this.pacientes = pacientes;
        this.filteredPacientes = pacientes;
      },
      error => {
        console.log('Error al obtener los pacientes:', error);
      }
    );
    //this.filteredPacientes = this.pacientes; // Inicializar con todos los pacientes al cargar la página
  }

  filtrarPorNombre() {
    if (this.searchFilter.trim() === '') {
      // Si el campo de búsqueda está vacío, muestra todos los pacientes
      this.filteredPacientes = this.pacientes;
    } else {
      // Filtra los pacientes por nombre según el criterio de búsqueda
      this.filteredPacientes = this.pacientes.filter(paciente =>
        paciente.Nombre.toLowerCase().includes(this.searchFilter.toLowerCase())
      );
    }
  }

}
