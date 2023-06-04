import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule } from '@ionic/angular';

import { MensajeriaListadoPageRoutingModule } from './mensajeria-listado-routing.module';

import { MensajeriaListadoPage } from './mensajeria-listado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MensajeriaListadoPageRoutingModule, 
    HttpClientModule
  ],
  declarations: [MensajeriaListadoPage]
})
export class MensajeriaListadoPageModule {}
