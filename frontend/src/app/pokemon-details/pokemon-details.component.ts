import { HttpClient } from "@angular/common/http";
import { OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Pokemon } from "../models/pokemon.model";

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss', '../../type-icons.css'],
  imports: [HttpClientModule, CommonModule],
  encapsulation: ViewEncapsulation.Emulated,
  standalone: true,
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: {
    imageUrl: string;
    name: string;
    dexNumber: number;
    types: string[];
    moves: { name: string; type: string }[];
  } | null = null;

  private apiUrl = '/api';

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

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: { [key: string]: any }) => {
      const id = params['id'];
      if (id) {
        this.fetchPokemonDetails(id);
      }
    });
  }

  fetchPokemonDetails(id: string): void {
    this.http.get<Pokemon>(`${this.apiUrl}/pokemons/${id}`).subscribe(
      (data: Pokemon) => {
        this.pokemon = data;
      },
      (error: any) => {
        console.error('Error fetching Pokemon details:', error);
      }
    );
  }

  onImageError(type: string): void {
    console.error(`Error carregant la imatge del tipus: ${type}`);
  }
}
