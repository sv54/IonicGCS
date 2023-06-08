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
    loadChildren: () => import('./form-medicamento/form-medicamento.module').then( m => m.FormMedicamentoPageModule)
  },
  {
    path: 'form-medicamento/:idMedicamento/editar',
    loadChildren: () => import('./form-medicamento/form-medicamento.module').then( m => m.FormMedicamentoPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
