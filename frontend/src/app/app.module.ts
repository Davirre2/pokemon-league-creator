import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { RouterOutlet } from '@angular/router';
import { GymTeamsComponent } from './gym-teams/gym-teams.component';

@NgModule({

  imports: [
    BrowserModule,
    HttpClientModule,
    RouterOutlet,
    PokemonListComponent,
    GymTeamsComponent,
  ],
  providers: [],
})
export class AppModule {}
