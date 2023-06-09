import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MensajeriaListadoPage } from './mensajeria-listado.page';

const routes: Routes = [
  {
    path: '',
    component: MensajeriaListadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MensajeriaListadoPageRoutingModule {}
