import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Pokemon } from '../../models/pokemon.model';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';

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

  constructor(private http: HttpClient, private route: ActivatedRoute, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: { [key: string]: any; }) => {
      const type = params['type'];
      const generation = params['generation'];
      if (type) {
        this.loadPokemonsByType(type);
      } else if (generation){
        this.loadPokemonsByGeneration(generation);
      } else {
        this.loadAllPokemons();
      }
    });
  }

  loadAllPokemons(): void {
    this.pokemonService.getAllPokemons().subscribe({
      next: (data: any) => {
        this.pokemons = data;
      },
      error: (err: any) => {
        console.error('Error carregant pokémons', err);
      },
    });
  }

  loadPokemonsByType(type: string): void {
    this.pokemonService.getPokemonsByType(type).subscribe({
      next: (data) => {
        this.pokemons = data;
      },
      error: (err) => {
        console.error('Error carregant pokémons', err);
      },
    });
  }

  loadPokemonsByGeneration(generation: string): void {
    this.pokemonService.getPokemonsByGeneration(generation).subscribe({
      next: (data) => {
        this.pokemons = data;
      },
      error: (err) => {
        console.error('Error carregant pokémons', err);
      },
    });
  }
}
