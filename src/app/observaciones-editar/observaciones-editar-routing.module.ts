import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ObservacionesEditarPage } from './observaciones-editar.page';

const routes: Routes = [
  {
    path: '',
    component: ObservacionesEditarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ObservacionesEditarPageRoutingModule {}
