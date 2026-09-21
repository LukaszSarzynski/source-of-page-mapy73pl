import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'przemienniki-krotkofalarskie.jpeg',
    loadChildren: () => import('./start-page/start-page.module').then( m => m.StartPagePageModule)
  },  
  {
    path: 'repeaters-type/:type/:country',
    loadChildren: () => import('./type/type.module').then( m => m.TypePageModule)
  },  
  {
    path: 'mapa-przemiennikow',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'page',
    loadChildren: () => import('./static/static.module').then( m => m.StaticPageRoutingModule)
  },  
  {
    path: 'repeater/:id',
    loadChildren: () => import('./repeater/repeater.module').then( m => m.RepeaterPageModule)
  },
  {
    path: 'export',
    loadChildren: () => import('./export/export.module').then( m => m.ExportPageModule)
  },  

  {
    path: '',
    redirectTo: 'przemienniki-krotkofalarskie.jpeg',
    pathMatch: 'full'
  },
  {path: '**', redirectTo: 'przemienniki-krotkofalarskie.jpeg'},



  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full'
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: false })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
