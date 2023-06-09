import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'main-menu',
    loadChildren: () => import('./main-menu/main-menu.module').then( m => m.MainMenuPageModule)
  },
  {
    path: 'paciente/:DNI',
    loadChildren: () => import('./paciente-historial/paciente-historial.module').then( m => m.PacienteHistorialPageModule)
  },
  {
    path: 'configuration-page',
    loadChildren: () => import('./configuration-page/configuration-page.module').then( m => m.ConfigurationPagePageModule)
  },
  {
    path: 'agregar-paciente-page',
    loadChildren: () => import('./agregar-paciente-page/agregar-paciente-page.module').then( m => m.AgregarPacientePagePageModule)
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
