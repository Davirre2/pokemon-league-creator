import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', component: MainLayoutComponent }, // Root route can be empty or have a dedicated component
      { path: 'pokemons', component: PokemonListComponent },
      { path: 'pokemons/type/:type', component:PokemonListComponent},
      { path: 'pokemons/generation/:generation', component: PokemonListComponent },
    ],
  },
];
