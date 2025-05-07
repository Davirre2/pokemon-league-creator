import { Routes } from '@angular/router';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AppComponent } from './app.component';
import { PokemonDetailsComponent } from './pokemon-details/pokemon-details.component';
import { GymTeamsComponent } from './gym-teams/gym-teams.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', component: MainLayoutComponent },
      { path: 'pokemons', component: PokemonListComponent },
      { path: 'pokemons/type/:type', component:PokemonListComponent},
      { path: 'pokemons/generation/:generation', component: PokemonListComponent },
      { path: 'pokemons/:id', component: PokemonDetailsComponent },
      { path: 'gymTeams', component: GymTeamsComponent },
    ],
  },
];
