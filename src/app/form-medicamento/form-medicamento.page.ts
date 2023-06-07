import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form-medicamento',
  templateUrl: './form-medicamento.page.html',
  styleUrls: ['./form-medicamento.page.scss'],
})
export class FormMedicamentoPage implements OnInit {
  nombre: string;
  fechaInicio: string;
  fechaFin: string;
  vecesDia: number;
  detalles: string;

  constructor(private navCtrl: NavController, private http: HttpClient, private toastController: ToastController) {
    this.nombre = "";
    this.fechaInicio = "";
    this.fechaFin = "";
    this.vecesDia = 0;
    this.detalles = "";
  }

  ngOnInit() {
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
    this.navCtrl.navigateForward('/tabs/tab2');
  }

  agregarMedicamento() {
    if (this.vecesDia <= 0 || !Number.isInteger(this.vecesDia)) {
      this.mostrarMensajeError('El número de días debe ser un valor entero positivo');      return;
    }

    // Validar que la fecha de inicio sea menor que la fecha de fin
    const fehcaInicioDate = new Date(this.fechaInicio);
    const fechaFinDate = new Date(this.fechaFin);

    if (fehcaInicioDate >= fechaFinDate) {
      this.mostrarMensajeError('La fecha de inicio debe ser anterior a la fecha de fin');
      return;
    }

    //Como conseguir valor?
    const idPaciente = 1; // Reemplaza con el valor del ID del paciente

    const medicamento = {
      Nombre: this.nombre,
      FechaInicio: fehcaInicioDate,
      FechaFin: fechaFinDate,
      VecesDia: this.vecesDia,
      Detalles: this.detalles,
    };

    this.http.post(`/formMedicamento/${idPaciente}`, medicamento)
      .subscribe(
        (response) => {
          console.log('Medicamento insertado correctamente');
          this.mostrarMensajeExito('Medicamento/Actividad insertad@ correctamente');
          this.redirigirAPagina();
        },
        (error) => {
          console.log(medicamento)
          console.log(idPaciente)
          console.error('Error al insertar el medicamento', error);
          this.mostrarMensajeError('Error al insertar el medicamento');
        }
      );

    //ID_paciente
    //Hacer constructor para cargar el editar con los valores
    //Arreglar llamada form-medicamentos/1 (que no pilla parametro)
  }
}
