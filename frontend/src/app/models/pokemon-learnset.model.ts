import { Pokemon } from "./pokemon.model";

export interface PokemonLearnset {
    pokemon: Pokemon;
    learnset: string[];
}