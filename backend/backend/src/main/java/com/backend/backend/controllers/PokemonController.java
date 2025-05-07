package com.backend.backend.controllers;

import com.backend.backend.domain.GymTeam;
import com.backend.backend.domain.Pokemon;
import com.backend.backend.domain.PokemonLearnset;
import com.backend.backend.utils.GymTeamRepository;
import com.backend.backend.utils.PokemonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200/pokemons")
@RestController
public class PokemonController {

    @Autowired
    private PokemonRepository pokemonRepository;

    @Autowired
    private GymTeamRepository gymTeamRepository;

    @GetMapping(value = "/pokemons")
    public List<Pokemon> getAllPokemons() {
        System.out.println("Aquí dins");
        return pokemonRepository.findAll();
    }

    @GetMapping(value = "/pokemons/type={type}")
    public List<Pokemon> getAllPokemonsByType(@PathVariable String type) {
        return pokemonRepository.findAll().stream()
                .filter(pokemon -> {
                    List<String> types = pokemon.getTypes();
                    return (!types.isEmpty() && types.get(0).equalsIgnoreCase(type)) ||
                            (types.size() > 1 && types.get(1).equalsIgnoreCase(type));
                })
                .toList();
    }

    @GetMapping(value = "/pokemons/generation={generation}")
    public List<Pokemon> getAllPokemonsByGeneration(@PathVariable int generation){
        return pokemonRepository.findAll().stream()
                .filter(pokemon -> pokemon.getGeneration().equals(generation))
                .toList();
    }
    
    @GetMapping(value = "/pokemons/{id}")
    public Optional<Pokemon> getPokemonById(@PathVariable int id){
        return pokemonRepository.findById(id);
    }

    @GetMapping(value = "/gymteams")
    public List<GymTeam> getGymTeams(){
        return gymTeamRepository.findAll();
    }

    @PostMapping(value = "/gymteams")
    public void createGymTeam(){
        GymTeam gymTeam = GymTeam.builder()
                .pokemons(List.of())
                .acePokemon(null)
                .gymType(null)
                .build();

        gymTeamRepository.save(gymTeam);
    }

    @PutMapping(value = "/gymteams/{id}")
    public void addPokemonToGymTeam(@PathVariable int id, @RequestBody PokemonLearnset pokemon){
        GymTeam gymTeam = gymTeamRepository.findById(id).orElseThrow(() -> new RuntimeException("Gym team not found"));
        if(gymTeam.getPokemons().size() < 6){
            gymTeam.addPokemonLearnset(pokemon);
            gymTeamRepository.save(gymTeam);
        } else {
            System.out.println("No es poden afegir més Pokémon a l'equip.");
        }
    }

    @PutMapping(value = "/gymteams/{id}/ace")
    public void setAcePokemon(@PathVariable int id, @RequestBody String acePokemon){
        GymTeam gymTeam = gymTeamRepository.findById(id).orElseThrow(() -> new RuntimeException("Gym team not found"));
        if(gymTeam.getPokemons().stream().anyMatch(pokemonLearnset -> pokemonLearnset.getPokemon().getName().equals(acePokemon))) {
            gymTeam.setAcePokemon(acePokemon);
            gymTeamRepository.save(gymTeam);
        } else {
            System.out.println("El Pokémon no forma part de l'equip.");
        }
    }
    @DeleteMapping(value = "/gymteams/{id}/pokemons/{pokemonId}")
    public void removePokemonFromGymTeam(@PathVariable int id, @PathVariable int pokemonId){
        GymTeam gymTeam = gymTeamRepository.findById(id).orElseThrow(() -> new RuntimeException("Gym team not found"));
        PokemonLearnset pokemonLearnset = gymTeam.getPokemons().stream()
                .filter(pokemon -> pokemon.getPokemon().getId() == pokemonId)
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Pokemon not found in the team"));
        gymTeam.removePokemonLearnset(pokemonLearnset);
        gymTeamRepository.save(gymTeam);
    }

    @DeleteMapping(value = "/gymteams/{id}")
    public void deleteGymTeam(@PathVariable int id){
        GymTeam gymTeam = gymTeamRepository.findById(id).orElseThrow(() -> new RuntimeException("Gym team not found"));
        gymTeamRepository.delete(gymTeam);
    }


}
