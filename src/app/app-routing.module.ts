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
    path: 'form-medicamento/:idPaciente/agregar',
    data: {
      modo: 'agregar'
    },
    loadChildren: () => import('./form-medicamento/form-medicamento.module').then( m => m.FormMedicamentoPageModule)
  },
  {
    path: 'form-medicamento/:idMedicamento/editar',
    data: {
      modo: 'editar'
    },
    loadChildren: () => import('./form-medicamento/form-medicamento.module').then( m => m.FormMedicamentoPageModule)
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
  },
  {
    path: 'listado-pacientes',
    loadChildren: () => import('./tab2/tab2.module').then( m => m.Tab2PageModule)
  },
  {
    path: 'observaciones-editar/:DNI',
    loadChildren: () => import('./observaciones-editar/observaciones-editar.module').then( m => m.ObservacionesEditarPageModule)
  },  {
    path: 'notificaciones',
    loadChildren: () => import('./notificaciones/notificaciones.module').then( m => m.NotificacionesPageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
