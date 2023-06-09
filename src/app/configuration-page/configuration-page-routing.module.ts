import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigurationPagePage } from './configuration-page.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurationPagePageRoutingModule {}
