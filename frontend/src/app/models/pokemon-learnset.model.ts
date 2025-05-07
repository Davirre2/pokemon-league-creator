import { Move } from "./move.models";
import { Pokemon } from "./pokemon.model";

export interface PokemonLearnset {
    pokemon: Pokemon;
    moves: Move[];
}