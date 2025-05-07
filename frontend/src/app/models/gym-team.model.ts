import { PokemonLearnset } from "./pokemon-learnset.model";

export interface GymTeam{
    gymNumber: number;
    pokemons: PokemonLearnset[];
    type: string;
    acePokemon: string;
}