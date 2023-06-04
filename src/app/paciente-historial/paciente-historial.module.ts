import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PacienteHistorialPageRoutingModule } from './paciente-historial-routing.module';

import { PacienteHistorialPage } from './paciente-historial.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PacienteHistorialPageRoutingModule
  ],
  declarations: [PacienteHistorialPage]
})
export class PacienteHistorialPageModule {}
