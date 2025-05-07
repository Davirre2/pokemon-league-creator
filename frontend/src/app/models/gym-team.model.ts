import { PokemonLearnset } from "./pokemon-learnset.model";

export interface GymTeam{
    id: number;
    pokemonLearnsets: PokemonLearnset[];
    type: string;
    acePokemon: string;
}