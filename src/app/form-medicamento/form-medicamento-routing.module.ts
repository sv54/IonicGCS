import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormMedicamentoPage } from './form-medicamento.page';

const routes: Routes = [
  {
    path: '',
    component: FormMedicamentoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormMedicamentoPageRoutingModule {}
