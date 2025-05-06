import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Pokemon } from '../../models/pokemon.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss', '../../../type-icons.css'],
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  encapsulation: ViewEncapsulation.None,
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[] = [];
  private apiUrl = '/api'

  typeIconMap: { [key: string]: string } = {
    bug: '/assets/icons/bug.svg',
    dark: '/assets/icons/dark.svg',
    dragon: '/assets/icons/dragon.svg',
    electric: '/assets/icons/electric.svg',
    fire: '/assets/icons/fire.svg',
    fairy: '/assets/icons/fairy.svg',
    fighting: '/assets/icons/fighting.svg',
    flying: '/assets/icons/flying.svg',
    ghost: '/assets/icons/ghost.svg',
    grass: '/assets/icons/grass.svg',
    ground: '/assets/icons/ground.svg',
    ice: '/assets/icons/ice.svg',
    normal: '/assets/icons/normal.svg',
    poison: '/assets/icons/poison.svg',
    psychic: '/assets/icons/psychic.svg',
    rock: '/assets/icons/rock.svg',
    steel: '/assets/icons/steel.svg',
    water: '/assets/icons/water.svg',
  };

  onImageError(type: string): void {
    console.error(`Error carregant la imatge del tipus: ${type}`);
    console.error(`Ruta generada: ${this.typeIconMap[type.toLowerCase()]}`);
  }

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: { [key: string]: any; }) => {
      const type = params['type'];
      const generation = params['generation'];
      if (type) {
        this.fetchPokemonsByType(type);
      } else if (generation){
        this.fetchPokemonsByGeneration(generation);
      } else {
        this.fetchAllPokemons();
      }
    });
  }

  fetchAllPokemons(): void {
    this.http.get<Pokemon[]>(`${this.apiUrl}/pokemons`).subscribe({
      next: data => {
        this.pokemons = data;
      },
      error: err => {
        console.error('Error carregant pokémons', err);
      }
    });
  }
  fetchPokemonsByType(type: string): void {
    this.http.get<Pokemon[]>(`${this.apiUrl}/pokemons/type=${type}`).subscribe({
      next: data => {
        this.pokemons = data;
      },
      error: err => {
        console.error('Error carregant pokémons', err);
      }
    });
  }
  fetchPokemonsByGeneration(generation: string): void {
    this.http.get<Pokemon[]>(`${this.apiUrl}/pokemons/generation=${generation}`).subscribe({
      next: data => {
        this.pokemons = data;
      },
      error: err => {
        console.error('Error carregant pokémons', err);
      }
    });
}
}
