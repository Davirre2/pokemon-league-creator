import { Component, OnInit } from '@angular/core';
import { GymTeamService } from '../services/gym-team.service';
import { GymTeam } from '../models/gym-team.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gym-teams',
  templateUrl: './gym-teams.component.html',
  styleUrls: ['./gym-teams.component.scss'],
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
})
export class GymTeamsComponent implements OnInit {
  gymTeams: GymTeam[] = [];
  showAddGymForm: boolean = false; // Controla la visibilitat del formulari d'afegir gimnàs
  step: number = 1; // Controla el pas actual del procés
  selectedType: string = ''; // Tipus seleccionat
  selectedPokemon: any = null; // Pokémon seleccionat
  selectedMoves: string[] = []; // Moviments seleccionats
  availableTypes: string[] = [
    'Normal', 'Fire', 'Water', 'Grass', 'Electric', 'Ice', 'Fighting', 'Poison',
    'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'
  ];
  availablePokemons: any[] = []; // Llista de Pokémons disponibles
  availableMoves: string[] = []; // Llista de moviments disponibles per al Pokémon seleccionat

  constructor(private gymTeamService: GymTeamService) {}

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
    this.step = 1; // Comença al pas 1
    this.selectedType = '';
    this.selectedPokemon = null;
    this.selectedMoves = [];
  }

  selectType(type: string): void {
    this.selectedType = type;
    this.step = 2; // Passa al pas 2
    this.loadAvailablePokemons();
  }

  loadAvailablePokemons(): void {
    // Aquí pots fer una crida al servei per obtenir els Pokémons disponibles
    // Exemple: this.pokemonService.getAllPokemons().subscribe(...)
    this.availablePokemons = [
      { name: 'Pikachu', moves: ['Thunderbolt', 'Quick Attack', 'Iron Tail', 'Electro Ball'] },
      { name: 'Charizard', moves: ['Flamethrower', 'Fly', 'Dragon Claw', 'Heat Wave'] },
      // Afegeix més Pokémons aquí
    ];
  }

  selectPokemon(pokemon: any): void {
    this.selectedPokemon = pokemon;
    this.availableMoves = pokemon.moves; // Carrega els moviments del Pokémon seleccionat
    this.step = 3; // Passa al pas 3
  }

  selectMove(move: string): void {
    if (this.selectedMoves.length < 4 && !this.selectedMoves.includes(move)) {
      this.selectedMoves.push(move);
    }
  }

  removeMove(move: string): void {
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
      id: 0, // L'ID serà generat pel backend
      pokemonLearnsets: [
        {
          pokemon: this.selectedPokemon,
          learnset: this.selectedMoves,
        },
      ],
      type: this.selectedType,
      acePokemon: this.selectedPokemon.name,
    };
    

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