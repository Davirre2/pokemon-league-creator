package com.backend.backend.controllers;

import com.backend.backend.domain.Pokemon;
import com.backend.backend.utils.PokemonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200/pokemons")
@RestController
public class PokemonController {

    @Autowired
    private PokemonRepository pokemonRepository;

    @GetMapping(value = "/pokemons")
    public List<Pokemon> getAllPokemons() {
        System.out.println("Aquí dins");
        return pokemonRepository.findAll();
                //.stream()
                //.map(Pokemon::getName)
                //.toList();
    }

}
