import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-observaciones-editar',
  templateUrl: './observaciones-editar.page.html',
  styleUrls: ['./observaciones-editar.page.scss'],
})
export class ObservacionesEditarPage implements OnInit {

  constructor(private router: Router, private storage: StorageService, private http: HttpClient, private toastController: ToastController, private navCtrl: NavController) { }
  patient: any;
  obsText: string | undefined;

  ngOnInit() {
    this.storage.get("paciente")?.then((value) => {
      this.patient = value;
      this.obsText = this.patient.observaciones;
    });
  }
  async updateObservaciones() {  
    var observaciones = this.obsText;
    const url = `http://localhost:3000/pacientes/${this.patient.Id}`;
    const body = { observaciones };
  
    try {
      await this.http.put(url, body).toPromise();
      console.log('Observaciones updated successfully');
    } catch (error) {
      //console.error('Failed to update observaciones:', error);
    }
    this.navCtrl.navigateRoot(["paciente/" + this.patient.DNI]);
  }
}
