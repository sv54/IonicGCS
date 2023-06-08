import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigurationPagePageRoutingModule } from './configuration-page-routing.module';

import { ConfigurationPagePage } from './configuration-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigurationPagePageRoutingModule
  ],
  declarations: [ConfigurationPagePage]
})
export class ConfigurationPagePageModule {}
