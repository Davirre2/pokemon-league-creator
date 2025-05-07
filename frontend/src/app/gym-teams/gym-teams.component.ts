import { Component, OnInit } from '@angular/core';
import { GymTeamService } from '../services/gym-team.service';
import { GymTeam } from '../models/gym-team.model';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Move } from '../models/move.models';
import { PokemonService } from '../services/pokemon.service';
import { PokemonLearnset } from '../models/pokemon-learnset.model';
import { AVAILABLE_TYPES, AVAILABLE_GYM_NUMBERS, typeIconMap } from '../../constants';


@Component({
  selector: 'app-gym-teams',
  templateUrl: './gym-teams.component.html',
  styleUrls: ['./gym-teams.component.scss', '../../type-icons.css', './styles/gym-team-card.scss', 
    './styles/gym-image.scss', './styles/gym-grid.scss', './styles/gym-move-box.scss', './styles/gym-move-buttons.scss'
    ,
  ],
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule],
})
export class GymTeamsComponent implements OnInit {
  gymTeams: GymTeam[] = [];
  showAddGymForm: boolean = false; 
  step: number = 1;
  selectedType: string = ''; 
  selectedPokemon: any = null; 
  selectedGymNumber: number | null = null;
  selectedMoves: Move[] = [];
  selectedPokemons: PokemonLearnset[] = [];
  availableTypes = AVAILABLE_TYPES;
  availableGymNumbers = AVAILABLE_GYM_NUMBERS;
  typeIconMap = typeIconMap;  
  availablePokemons: any[] = []; 
  availableMoves: Move[] = []; 
  acePokemon: string = '';
  selectedGym: any = null;


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
    this.selectedGymNumber = 0;
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

  selectAcePokemon(pokemon: any | false): void {
    if (pokemon) {
      this.acePokemon = pokemon.name;
    } else {
      this.selectedPokemon = null;
      this.step = 2;
    }
  }

  backToGrid(): void {
    this.selectedGymNumber = null;
  }

  viewGymDetails(gymNumber: number): void {
    this.selectedGymNumber = gymNumber;
    this.selectedGym = this.gymTeams.find(gym => gym.gymNumber === gymNumber);
  }

    
  loadAvailablePokemons(): void {
    this.pokemonService.getPokemonsByType(this.selectedType).subscribe({
      next: (data) => {
        this.availablePokemons = data.map((pokemon: any) => ({
          name: pokemon.name,
          moves: pokemon.moves,
          id: pokemon.id,
          imageUrl: pokemon.imageUrl,
          types: pokemon.types,
          abilities: pokemon.abilities,
          generation: pokemon.generation,
          dexNumber: pokemon.dexNumber,
        }));
      },
      error: (err) => {
        console.error('Error carregant pokémons', err);
      },
    });
  }

  onImageError(type: string): void {
    console.error(`Error carregant la imatge del tipus: ${type}`);
    console.error(`Ruta generada: ${this.typeIconMap[type.toLowerCase()]}`);
  }

  selectPokemon(pokemon: any): void {
    this.selectedPokemon = pokemon;
    this.availableMoves = pokemon.moves.map((move: any) => ({
      name: move.name,
      type: move.type, 
    }))
    .sort((a: Move, b: Move) => a.name.localeCompare(b.name));
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

  getGymByNumber(gymNumber: number): GymTeam | undefined {
    return this.gymTeams.find(gym => gym.gymNumber === gymNumber);
  }


  openAddGymForm(): void {
    this.showAddGymForm = true;
    this.selectedGymNumber = null; // Reinicia la selecció
  }

  addAnotherPokemon(): void {
    this.selectedPokemons.push(
      {
        pokemon: this.selectedPokemon,
        moves: this.selectedMoves,
      }
    );
    this.selectedPokemon = null;
    this.selectedMoves = [];
    this.step = 2;
  }

  deleteGym(num: number): void {
    this.gymTeamService.deleteGymTeam(num).subscribe({
      next: (response) => {
        console.log('Gimnàs eliminat correctament', response);
        this.backToGrid();
        this.loadGymTeams();
      },
      error: (err) => {
        console.error('Error eliminant gimnàs', err);
      },
    });
  }

  finalizeGym(): void {
    this.selectedPokemons.push(
      {
        pokemon: this.selectedPokemon,
        moves: this.selectedMoves,
      }
    )
    if(this.acePokemon == '') this.acePokemon = this.selectedPokemons[0].pokemon.name;
    this.step = 1;
    const newGymTeam: GymTeam = {
      gymNumber: this.selectedGymNumber ?? 0,
      pokemons: this.selectedPokemons,
      gymType: this.selectedType,
      acePokemon: this.acePokemon,
    };

    this.gymTeamService.addGymTeam(newGymTeam).subscribe({
      next: (response) => {
        console.log('Gimnàs creat correctament', response);
        this.loadGymTeams();
        this.resetGymCreation(); // Reinicia el formulari després de crear el gimnàs
      },
      error: (err) => {
        console.error('Error creant gimnàs', err);
      },
    });
  }
  resetGymCreation(): void {
    this.step = 1;
    this.selectedGymNumber = null;
    this.selectedType = '';
    this.selectedPokemon = null;
    this.selectedMoves = [];
    this.acePokemon = '';
    this.showAddGymForm = false; // Opcional: Tanca el formulari si cal
  }
}