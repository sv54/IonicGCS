import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-configuration-page',
  templateUrl: './configuration-page.page.html',
  styleUrls: ['./configuration-page.page.scss'],
})
export class ConfigurationPagePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  guardar(){
    this.router.navigateByUrl('/main-menu')
  }

  cancelar(){
    this.router.navigateByUrl('/main-menu')
  }

}
