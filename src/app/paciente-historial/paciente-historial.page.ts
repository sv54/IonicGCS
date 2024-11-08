import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-paciente-historial',
  templateUrl: './paciente-historial.page.html',
  styleUrls: ['./paciente-historial.page.scss'],
})
export class PacienteHistorialPage implements OnInit {

  constructor(private storage: StorageService, private http: HttpClient, private toastController: ToastController, private navCtrl: NavController) { }

  patient: any;
  medicamentos: any[]=[];
  Editar=false;
  meds=false;
  pac = false;
  ngOnInit() {
 
    this.storage.get("paciente")?.then((value) => {
      this.patient = value;
  
      if (this.patient !== null && this.patient !== undefined) {
        this.fetchMedicamentos();
        this.meds = true;
      }

    });
    this.pac = true;
  }
  ionViewWillEnter() {
    if (this.patient !== null) {
      this.fetchPatientById();
      this.fetchMedicamentos();
    }
  }

  toggleEditar() {
    this.Editar = !this.Editar;
  }

  toggleEnviarMensaje() {
    this.navCtrl.navigateForward('/mensajeria/' + this.patient.Id)
  }

  async mostrarMensajeError(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: 'danger',
      position: 'top',
    });
    toast.present();
  }

  async mostrarMensajeExito(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: 'success',
      position: 'top',
    });
    toast.present();
  }

  redirigirAPagina() {
    this.navCtrl.navigateForward('/paciente/'+this.patient);
  }

  eliminarMedicamento(medicamentoID: number){
    console.log('NEPE: ', medicamentoID)
    this.http.delete(`http://localhost:3000/formMedicamento/${medicamentoID}/eliminar`, { responseType: 'text' })
      .subscribe(
        (response: any) => {
          console.log('Medicamento eliminado correctamente');
          this.mostrarMensajeExito('Medicamento/Actividad eliminad@ correctamente');
          this.redirigirAPagina();
        },
        (error: any) => {
          console.error('Error al eliminar el medicamento', error);
          this.mostrarMensajeError('Error al eliminar el medicamento');
        });
  }

  async fetchMedicamentos() {
    console.log("fetching");
    if (this.patient !== null && this.patient !== undefined) {

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
  fetchPatientById() {
    if (this.patient !== null && this.patient !== undefined) {

      const patientId = this.patient.Id
      console.log(`Fetching patient with ID: ${patientId}`);
      this.http.get<any>(`http://localhost:3000/pacientes/${patientId}`)
        .subscribe(
          (data) => {
            this.patient = data;
            console.log('Fetched Patient:', this.patient);
          },
          (error) => {
            console.error('Failed to fetch patient:', error);
          }
        );
    }
  }
  
  
}
