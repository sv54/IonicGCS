import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'mensajeria-listado',
    loadChildren: () => import('./mensajeria-listado/mensajeria-listado.module').then( m => m.MensajeriaListadoPageModule)
  },
  {
    path: 'mensajeria/:id',
    loadChildren: () => import('./mensajeria/mensajeria.module').then( m => m.MensajeriaPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
