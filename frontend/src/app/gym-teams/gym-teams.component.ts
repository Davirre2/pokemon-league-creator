import { Component, OnInit } from '@angular/core';
import { GymTeamService } from '../services/gym-team.service';
import { GymTeam } from '../models/gym-team.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Move } from '../models/move.models';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-gym-teams',
  templateUrl: './gym-teams.component.html',
  styleUrls: ['./gym-teams.component.scss'],
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
})
export class GymTeamsComponent implements OnInit {
  gymTeams: GymTeam[] = [];
  showAddGymForm: boolean = false; 
  step: number = 1;
  selectedType: string = ''; 
  selectedPokemon: any = null; 
  selectedGymNumber: number = 0;
  selectedMoves: Move[] = [];
  availableTypes: string[] = [
    'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison',
    'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
  ];
  availablePokemons: any[] = []; 
  availableMoves: Move[] = []; 

  availableGymNumbers: number[] = Array.from({ length: 18 }, (_, i) => i + 1);

  constructor(private gymTeamService: GymTeamService, private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadGymTeams();
  }

  loadGymTeams(): void {
    this.gymTeamService.getGymTeams().subscribe({
      next: (data) => {
        this.gymTeams = data;
      },
      error: (err) => {
        console.error('Error carregant gimnasos', err);
      },
    });
  }

  startGymCreation(): void {
    this.step = 1; 
    this.selectedType = '';
    this.selectedPokemon = null;
    this.selectedMoves = [];
  }

  selectGymNumber(gymNumber: number): void {
    this.selectedGymNumber = gymNumber;
    this.step = 1; // Passa al pas 1 després de seleccionar el número
  }

  onInputChange(event: Event): void {
    const inputElement = event.target as HTMLSelectElement;
    const value = parseInt(inputElement.value, 10); 
    this.selectedGymNumber = value; 
    console.log('Gym Number seleccionat:', this.selectedGymNumber);
    this.step = 1; 
  }

  selectType(type: string): void {
    this.selectedType = type;
    this.step = 2; // Passa al pas 2
    this.loadAvailablePokemons();
  }

  loadAvailablePokemons(): void {
    this.pokemonService.getPokemonsByType(this.selectedType).subscribe({
      next: (data) => {
        this.availablePokemons = data.map((pokemon: any) => ({
          name: pokemon.name,
          moves: pokemon.moves,
        }));
      },
      error: (err) => {
        console.error('Error carregant pokémons', err);
      },
    });
  }

  selectPokemon(pokemon: any): void {
    this.selectedPokemon = pokemon; // Assigna el Pokémon seleccionat
    this.availableMoves = pokemon.moves.map((move: any) => ({
      name: move.name,
      type: move.type, 
    }));
    this.step = 3;
  }

  selectMove(move: Move): void {
    if (this.selectedMoves.length < 4 && !this.selectedMoves.includes(move)) {
      this.selectedMoves.push(move);
    }
  }

  removeMove(move: Move): void {
    this.selectedMoves = this.selectedMoves.filter(m => m !== move);
  }

  toggleAddGymForm(): void {
    this.showAddGymForm = !this.showAddGymForm; // Alterna la visibilitat del formulari
    if (!this.showAddGymForm) {
      this.step = 1; // Reinicia el procés si es tanca el formulari
    }
  }

  finalizeGym(): void {
    this.step = 1;
    const newGymTeam: GymTeam = {
      gymNumber: this.selectedGymNumber,
      pokemons: [
        {
          pokemon: this.selectedPokemon,
          learnset: this.selectedMoves,
        },
      ],
      gymType: this.selectedType,
      acePokemon: this.selectedPokemon.name,
    };
    console.log("acePokemon", this.selectedPokemon.name);


    this.gymTeamService.addGymTeam(newGymTeam).subscribe({
      next: (response) => {
        console.log('Gimnàs creat correctament', response);
        this.loadGymTeams(); // Actualitza la llista de gimnasos
        this.step = 1; // Reinicia el procés
      },
      error: (err) => {
        console.error('Error creant gimnàs', err);
      },
    });
  }
}