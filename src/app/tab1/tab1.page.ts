import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  errorMessage: string = '';
  errorOccured: boolean = false;

  constructor(private http: HttpClient, private storage: StorageService) {
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
          console.log(response.datos)
          this.storage.set('id', response.datos.Id);
          this.storage.set('email', emailInput.value);
          this.storage.set('password', passwordInput.value);
          this.storage.set('nombre', response.datos.Nombre);
          this.storage.set('dni', response.datos.DNI);
          this.storage.set('fechaNac', response.datos.FechaNac);
          this.storage.get('dni')?.then((value) => {
            console.log(value);
          })
        }
        else {
          console.log('no encontrado');
          this.showError();
        }
      }, error => {
        console.log(error)
      });
    }
  }

  showError() {
    this.errorOccured = true;
    this.errorMessage = 'Email o contraseña incorrectos!';
  }

}
