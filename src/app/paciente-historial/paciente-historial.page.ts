import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-paciente-historial',
  templateUrl: './paciente-historial.page.html',
  styleUrls: ['./paciente-historial.page.scss'],
})
export class PacienteHistorialPage implements OnInit {

  constructor(private storage: StorageService) { }

  patient: any;
  ngOnInit() {
    this.storage.get("paciente")?.then((value) =>{
      this.patient = value;
      console.log("paciente recibido: "+this.patient.DNI);
    });
  }

}
