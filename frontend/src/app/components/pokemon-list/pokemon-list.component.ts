import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Pokemon } from '../../models/pokemon.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  standalone: true,
  imports: [HttpClientModule, CommonModule],
})
export class PokemonListComponent implements OnInit {

  pokemons: Pokemon[] = [];
  private apiUrl = '/api'

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Pokemon[]>(`${this.apiUrl}/pokemons`).subscribe({
      next: data => {
        this.pokemons = data;
      },
      error: err => {
        console.error('Error carregant pokémons', err);
      }
    });
  }
}
