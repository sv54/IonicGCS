import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-form-medicamento',
  templateUrl: './form-medicamento.page.html',
  styleUrls: ['./form-medicamento.page.scss'],
})
export class FormMedicamentoPage implements OnInit {
  nombre!: string;
  fechaInicio!: string;
  fechaFin!: string;
  vecesDia!: number;
  detalles!: string;

  patient:any;
  pacienteId!: number;
  medicamentoId!: number;
  modo!: string;
  medicamento!: any;

  constructor(private storage: StorageService, private route: ActivatedRoute, private navCtrl: NavController, private http: HttpClient, private toastController: ToastController) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pacienteId = params['idPaciente'];
    });

    this.route.params.subscribe(params => {
      this.medicamentoId = params['idMedicamento'];
    });

    this.route.data.subscribe((data: any) => {
      this.modo = data.modo;
    });

    if(this.modo === 'editar'){
      const idMedicamentoEdit = this.route.snapshot.paramMap.get('idMedicamento');
      if (idMedicamentoEdit) {
        this.getMedicamento(idMedicamentoEdit.toString());
      }
    }

    this.storage.get("paciente")?.then((value) => {
      this.patient = value;
    });
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
    this.navCtrl.navigateForward('/paciente/'+this.patient.DNI);
  }

  //Petición al back para pillar los datos previos
  getMedicamento(idMedicamento: string) {
    this.http.get(`http://localhost:3000/formMedicamento/${idMedicamento}`).subscribe(
      (data: any) => {
        this.medicamento = data;
        /**console.log(this.medicamento);

        var fechaCorregidaI = new Date(this.medicamento.FechaInicio);
        fechaCorregidaI.setDate(fechaCorregidaI.getDate() + 1);

        var fechaCorregidaF = new Date(this.medicamento.FechaFin);
        fechaCorregidaF.setDate(fechaCorregidaF.getDate() + 1);

        this.medicamento.FechaFin = fechaCorregidaF;
        this.medicamento.FechaInicio = fechaCorregidaI;*/
      },
      (error) => {
        console.error(error);
      }
    );
  }

  agregarMedicamento() {
    //Cargar valores
    if(this.modo === 'editar'){
      this.nombre = this.medicamento.Nombre;
      this.fechaInicio = this.medicamento.FechaInicio;
      this.fechaFin = this.medicamento.FechaFin;
      this.vecesDia = parseInt(this.medicamento.VecesDia,10);
      this.detalles = this.medicamento.Detalles;
    }

    //VALIDACIONES
    if (this.vecesDia <= 0 || !Number.isInteger(this.vecesDia)) {
      this.mostrarMensajeError('El número de veces por día debe ser un valor entero positivo: '+this.vecesDia);
      return;
    }

    const fehcaInicioDate = new Date(this.fechaInicio);
    const fechaFinDate = new Date(this.fechaFin);

    if (fehcaInicioDate > fechaFinDate) {
      this.mostrarMensajeError('La fecha de inicio debe ser igual o anterior a la fecha de fin');
      return;
    }

    //PARAMETROS
    const idPaciente = this.pacienteId;
    const idMedicamento = this.medicamentoId;

    //FECHAS INICIO FORMATO
    const anyo = fehcaInicioDate.getFullYear().toString();
    let mes = (fehcaInicioDate.getMonth() +1).toString();
    if (mes.length === 1) {
      mes = '0' + mes;
    }
    let dia = fehcaInicioDate.getDate().toString();
    if (dia.length === 1) {
      dia = '0' + dia;
    }
    const fechaFormateadaI = anyo + '-' + mes + '-' + dia;

    //FECHA FINAL FORMATO
    const anyo2 = fechaFinDate.getFullYear().toString();
    let mes2 = (fechaFinDate.getMonth() +1).toString();
    if (mes2.length === 1) {
      mes2 = '0' + mes2;
    }
    let dia2 = fechaFinDate.getDate().toString();
    if (dia2.length === 1) {
      dia2 = '0' + dia2;
    }
    const fechaFormateadaF = anyo2 + '-' + mes2 + '-' + dia2;

    if (this.modo === 'agregar') {
      //CONSTRUCTOR
      const medicamento = {
        Nombre: this.nombre,
        FechaInicio: fechaFormateadaI,
        FechaFin: fechaFormateadaF,
        VecesDia: this.vecesDia,
        Detalles: this.detalles,
      };

      this.http.post(`http://localhost:3000/formMedicamento/${idPaciente}/agregar`, medicamento, { responseType: 'text' })
      .subscribe(
        (response: any) => {
          this.mostrarMensajeExito('Medicamento/Actividad insertad@ correctamente');
          this.redirigirAPagina();
        },
        (error: any) => {
          console.error('Error al insertar el medicamento', error);
          this.mostrarMensajeError('Error al insertar el medicamento');
        }
      );
    } else if (this.modo === 'editar') {
      //CONSTRUCTOR
      const medicamentoEdit = {
        Nombre: this.nombre,
        FechaInicio: fechaFormateadaI,
        FechaFin: fechaFormateadaF,
        VecesDia: this.vecesDia,
        Detalles: this.detalles,
        idPaciente: this.medicamento.fk_paciente,
      };

      this.http.put(`http://localhost:3000/formMedicamento/${idMedicamento}/editar`, medicamentoEdit, { responseType: 'text' })
      .subscribe(
        (response: any) => {
          console.log('Medicamento editado correctamente');
          this.mostrarMensajeExito('Medicamento/Actividad insertad@ correctamente');
          this.redirigirAPagina();
        },
        (error: any) => {
          console.error('Error al editar el medicamento', error);
          this.mostrarMensajeError('Error al editar el medicamento');
        }
      );
    }
  }
}
