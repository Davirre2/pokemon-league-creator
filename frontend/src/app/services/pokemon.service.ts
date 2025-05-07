import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'http://localhost:8080/pokemons';

  constructor(private http: HttpClient) {
    console.log('PokemonService initialized');
  }

  getAllPokemons(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.apiUrl);
  }

  getPokemonsByType(type: string): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.apiUrl}/type=${type}`);
  }

  getPokemonsByGeneration(generation: string): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(`${this.apiUrl}/generation=${generation}`);
  }

}
