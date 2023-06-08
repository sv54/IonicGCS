import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarPacientePagePageRoutingModule } from './agregar-paciente-page-routing.module';

import { AgregarPacientePagePage } from './agregar-paciente-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarPacientePagePageRoutingModule
  ],
  declarations: [AgregarPacientePagePage]
})
export class AgregarPacientePagePageModule {}
