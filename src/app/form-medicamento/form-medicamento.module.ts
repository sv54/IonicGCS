import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormMedicamentoPageRoutingModule } from './form-medicamento-routing.module';

import { FormMedicamentoPage } from './form-medicamento.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormMedicamentoPageRoutingModule
  ],
  declarations: [FormMedicamentoPage]
})

export class FormMedicamentoPageModule {}
