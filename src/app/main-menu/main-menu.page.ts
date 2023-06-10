import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';



@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage implements OnInit {

  constructor( private router: Router, private storage: StorageService) { }

  ngOnInit() {
  }

  async salir(){
    this.storage.set('id', "");
    this.storage.set('email', "");
    this.storage.set('password', "");
    this.storage.set('nombre', "");
    this.storage.set('dni', "");
    this.storage.set('fechaNac', "");
    this.router.navigateByUrl('/tabs/tab1')
  }

  async config(){
    this.router.navigateByUrl('/configuration-page')
  }

  async pacientes(){
    this.router.navigateByUrl('/listado-pacientes')
  }

  async agregarPaciente(){
    this.router.navigateByUrl('/agregar-paciente-page')
  }

  async mensajeria(){
    this.router.navigateByUrl('/mensajeria-listado')
  }

  async notificaciones(){
    this.router.navigateByUrl('/notificaciones')
  }
}
