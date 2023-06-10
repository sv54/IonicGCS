import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ObservacionesEditarPageRoutingModule } from './observaciones-editar-routing.module';

import { ObservacionesEditarPage } from './observaciones-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ObservacionesEditarPageRoutingModule
  ],
  declarations: [ObservacionesEditarPage]
})
export class ObservacionesEditarPageModule {}
