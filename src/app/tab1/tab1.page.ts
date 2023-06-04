import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private http: HttpClient) {
  }

  async login(emailInput: any, passwordInput: any ){
    console.log(emailInput.value, passwordInput.value);
    if(emailInput == ''  || passwordInput.value == ''){
      console.log('Please enter email and password');
    }

    const requestBody = {
      email: emailInput.value,
      password: passwordInput.value
    };

    this.http.post('https://localhost:3000/medicos/login', requestBody)
    .subscribe(data => {
      console.log(data)
    }, error => {
      console.log(error)
    });


  }

}
