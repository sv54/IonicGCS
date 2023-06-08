import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.page.html',
  styleUrls: ['./main-menu.page.scss'],
})
export class MainMenuPage implements OnInit {

  constructor( private router: Router) { }

  ngOnInit() {
  }


  async config(){
    this.router.navigateByUrl('/configuration-page')
  }

  async agregarPaciente(){
    this.router.navigateByUrl('/agregar-paciente-page')
  }
}
