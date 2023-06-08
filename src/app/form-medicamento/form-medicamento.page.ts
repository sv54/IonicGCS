import { Component, OnInit } from '@angular/core';
import { ToastController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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

  pacienteId!: number;
  medicamentoId!: number;
  modo!: string;

  constructor(private route: ActivatedRoute, private navCtrl: NavController, private http: HttpClient, private toastController: ToastController) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.pacienteId = params['idPaciente'];
    });

    this.route.params.subscribe(params => {
      this.medicamentoId = params['idMedicamento'];
    });

    this.route.paramMap.subscribe((params) => {
      const modoParam = params.get('modo');
      this.modo = modoParam === 'editar' ? 'editar' : 'agregar';
    });

    if(this.modo === 'editar'){
      const idMedicamento = this.route.snapshot.paramMap.get('idMedicamento');
      this.getMedicamento(idMedicamento);
    }
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

    //VALIDACIONES
    if (this.vecesDia <= 0 || !Number.isInteger(this.vecesDia)) {
      this.mostrarMensajeError('El número de días debe ser un valor entero positivo');      return;
    }

    const fehcaInicioDate = new Date(this.fechaInicio);
    const fechaFinDate = new Date(this.fechaFin);

    if (fehcaInicioDate >= fechaFinDate) {
      this.mostrarMensajeError('La fecha de inicio debe ser anterior a la fecha de fin');
      return;
    }

    //PARAMETROS
    const idPaciente = this.pacienteId;
    const idMedicamento = this.medicamentoId;

    //FECHAS INICIO FORMATO
    const anyo = fehcaInicioDate.getFullYear().toString();
    let mes = (fehcaInicioDate.getMonth() + 1).toString();
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
    let mes2 = (fechaFinDate.getMonth() + 1).toString();
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

      this.http.post<any>(`http://localhost:3000/formMedicamento/${idPaciente}/agregar`, medicamento)
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
    } else if (this.modo === 'editar') {
      //SELECT medicamento
      //GetDatos -> Cargar al formulario -> PacienteID get

      getMedicamento(idMedicamento: string) {
        this.http.get(`/formMedicamento/${idMedicamento}`).subscribe(
          (data: any) => {
            this.medicamento = data;
          },
          (error) => {
            console.error(error);
          }
        );
      }

      //CONSTRUCTOR
      const medicamento = {
        Nombre: this.nombre,
        FechaInicio: fechaFormateadaI,
        FechaFin: fechaFormateadaF,
        VecesDia: this.vecesDia,
        Detalles: this.detalles,
      };

      this.http.put<any>(`http://localhost:3000/formMedicamento/${idMedicamento}/editar`, medicamento)
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
    }

    //Hacer constructor para cargar el editar con los valores
  }
}
