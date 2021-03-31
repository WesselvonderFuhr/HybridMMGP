import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'pokemon/:id',
    loadChildren: () => import('./pages/pokemon-details/pokemon-details.module').then(m => m.PokemonDetailsPageModule)
  },
  {
    path: 'pokemon-list-all',
    loadChildren: () => import('./pages/pokemon-list-all/pokemon-list-all.module').then( m => m.PokemonListAllPageModule)
  },
  {
    path: 'pokemon-geo-list',
    loadChildren: () => import('./pages/pokemon-geo-list/pokemon-geo-list.module').then( m => m.PokemonGeoListPageModule)
  },
  {
    path: 'pokemon-caught-details/:id',
    loadChildren: () => import('./pages/pokemon-caught-details/pokemon-caught-details.module').then( m => m.PokemonCaughtDetailsPageModule)
  },
  {
    path: 'pokemon-caught-list',
    loadChildren: () => import('./pages/pokemon-caught-list/pokemon-caught-list.module').then( m => m.PokemonCaughtListPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
