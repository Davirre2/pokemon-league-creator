package com.pokemonmanager.backend.util.wrappers;

import com.pokemonmanager.backend.util.PokemonDataImporter;
import lombok.Data;

import java.util.List;

@Data
public class PokemonJsonWrapper {
    private List<PokemonDataImporter.RawPokemon> pokemons;
}
