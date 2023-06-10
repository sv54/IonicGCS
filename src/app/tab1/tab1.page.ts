import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { log } from 'console';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  errorMessage: string = '';
  errorOccured: boolean = false;

  constructor(private http: HttpClient, private storage: StorageService, private router: Router) {
  }

  async ionViewWillEnter(){
    var email = "";
    var password = "";
    this.storage.get('password').then((value) => {
      if (value) {
        console.log(value)
        password = value
      } else {
        console.log('No hay usuario logeado');
      }
    }).catch((error) => {
      // Error al obtener el valor del storage
      console.error('Error al obtener datos del storage:', error);
    });
    this.storage.get('email').then((value) => {
      if (value) {
        console.log("email: ", value)
        email = value
      } else {
        console.log('No hay usuario logeado');
      }
    }).catch((error) => {
      // Error al obtener el valor del storage
      console.error('Error al obtener datos del storage:', error);
    });


    setTimeout(() => {
      console.log(email, password)
      if(email && password){
        console.log("entrando")
        this.loginConString(email, password);
      }
    }, 1000)

  }

  async loginConString(emailInput: string, passwordInput: string ){
    console.log(emailInput, passwordInput);
    const requestBody = {
      email: emailInput,
      password: passwordInput
    };

    this.http.post('http://localhost:3000/medicos/login', requestBody)
    .subscribe(data => {
      const response:any = data;
      if (response.status == 'Ok'){
        console.log(response.datos)
        this.storage.set('id', response.datos.Id);
        this.storage.set('email', emailInput);
        this.storage.set('password', passwordInput);
        this.storage.set('nombre', response.datos.Nombre);
        this.storage.set('dni', response.datos.DNI);
        this.storage.set('fechaNac', response.datos.FechaNac);
        this.storage.get('dni')?.then((value) => {
          console.log(value);
        })
        this.errorOccured = false;
        this.router.navigateByUrl('/main-menu')

      }
      else {
        console.log('no encontrado');
        this.showError();
      }
    }, error => {
      console.log(error)
      this.showError();
    });

  }

  async login(emailInput: any, passwordInput: any ){
    console.log(emailInput.value, passwordInput.value);
    if(emailInput == ''  || passwordInput.value == ''){
      console.log('Please enter email and password');
    }
    else{
      const requestBody = {
        email: emailInput.value,
        password: passwordInput.value
      };

      this.http.post('http://localhost:3000/medicos/login', requestBody)
      .subscribe(data => {
        const response:any = data;
        if (response.status == 'Ok'){
          this.storage.set('id', response.datos.Id);
          this.storage.set('email', emailInput.value);
          this.storage.set('password', passwordInput.value);
          this.storage.set('nombre', response.datos.Nombre);
          this.storage.set('dni', response.datos.DNI);
          this.storage.set('fechaNac', response.datos.FechaNac);
          this.errorOccured = false;
          this.router.navigateByUrl('/main-menu')

        }
        else {
          console.log('no encontrado');
          this.showError();
        }
      }, error => {
        console.log(error)
        this.showError();

      });
    }
  }

  showError() {
    this.errorOccured = true;
    this.errorMessage = 'Email o contraseña incorrectos!';
  }

}
