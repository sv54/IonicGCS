import { Component, OnInit } from '@angular/core';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ok } from 'assert';

@Component({
  selector: 'app-agregar-paciente-page',
  templateUrl: './agregar-paciente-page.page.html',
  styleUrls: ['./agregar-paciente-page.page.scss'],
})
export class AgregarPacientePagePage implements OnInit {

  errorMessage: string = '';
  errorOccured: boolean = false;

  constructor(private storage: StorageService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  menu(){
    this.router.navigateByUrl('/main-menu')
  }

  async registrar(nombreInput: any, emailInput: any, dniInput: any, FechaNacInput: any) {

    if (!nombreInput.value || !emailInput.value || !dniInput.value || !FechaNacInput.value) {
      console.log("Por favor, complete todos los campos.");
      console.log(typeof FechaNacInput.value);
    }
    else{

      const fechaNacimientoString = FechaNacInput.value;
      const [dia, mes, anio] = fechaNacimientoString.split("-");
      const fechaNacimiento = new Date(Number(anio), Number(mes) - 1, Number(dia));

      let idMedico = 0
      this.storage.get('id')?.then((value) => {

        idMedico = value
      })
      idMedico = 5



      const requestBody = {
        Nombre: nombreInput.value,
        Email: emailInput.value,
        DNI: dniInput.value,
        FechaNac: FechaNacInput.value,
        Password: this.generarCharAleatorio(),
        fk_medico: idMedico
      };

      this.http.post('http://localhost:3000/regPaciente', requestBody)
        .subscribe(data => {
          const response:any = data;
          if (response.status == 'Ok'){
            console.log("Ok")
            this.menu();
          }
        }, error => {
          console.log(error.error)
          this.showError(error.error);

        });
    }
  }

  showError(errorMessage: string) {
    this.errorOccured = true;
    this.errorMessage = errorMessage;
  }

  generarCharAleatorio() {
    const caracteres = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    return caracteres.charAt(indiceAleatorio);
  }

  generarConstrasena(){
    const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[{]}|;:,<.>/?';
    let contrasena = '';

    for (let i = 0; i < 8; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      contrasena += caracteres.charAt(indiceAleatorio);
    }

    return contrasena;
  }

}
