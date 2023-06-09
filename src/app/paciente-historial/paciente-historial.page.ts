import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-paciente-historial',
  templateUrl: './paciente-historial.page.html',
  styleUrls: ['./paciente-historial.page.scss'],
})
export class PacienteHistorialPage implements OnInit {

  constructor(private storage: StorageService, private http: HttpClient) { }

  patient: any;
  medicamentos: any[]=[];
  Editar=false;

  ngOnInit() {
    this.storage.get("paciente")?.then(async (value) =>{
      this.patient = value;
      console.log("paciente recibido: "+this.patient.DNI);
      await this.fetchMedicamentos();
      console.log("msg: "+this.medicamentos[0].Nombre);
    });
  }

  toggleEditar() {
    this.Editar = !this.Editar;
  }

  async fetchMedicamentos() {
    console.log("fetching");
    this.http.get<any[]>('http://localhost:3000/medicamentos/'+this.patient.Id)
      .subscribe(
        data => {
          this.medicamentos = data;
          console.log('Medicamentos:', this.medicamentos);
        },
        error => {
          console.error('Failed to fetch medicamentos:', error);
        }
      );
  } 
}
