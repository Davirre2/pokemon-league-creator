import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';

export const routes: Routes = [
  { path: 'pokemons', component: PokemonListComponent },
  { path: '', redirectTo: 'pokemons', pathMatch: 'full' }, // Redirect to /pokemons by default
];