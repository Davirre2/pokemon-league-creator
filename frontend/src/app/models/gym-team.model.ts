import { PokemonLearnset } from "./pokemon-learnset.model";

export interface GymTeam{
    gymNumber: number;
    pokemons: PokemonLearnset[];
    gymType: string;
    acePokemon: string;
}