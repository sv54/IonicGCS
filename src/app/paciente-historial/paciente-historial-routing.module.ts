import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PacienteHistorialPage } from './paciente-historial.page';

const routes: Routes = [
  {
    path: '',
    component: PacienteHistorialPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PacienteHistorialPageRoutingModule {}
