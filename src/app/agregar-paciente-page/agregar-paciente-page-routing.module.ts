import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarPacientePagePage } from './agregar-paciente-page.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarPacientePagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarPacientePagePageRoutingModule {}
