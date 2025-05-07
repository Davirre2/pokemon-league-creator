package com.backend.backend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GymTeam {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer gymNumber;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "gym_id")
    private List<PokemonLearnset> pokemons = new ArrayList<>(); // Initialize to avoid null

    private String acePokemon;
    private String gymType;

    public void addPokemonLearnset(PokemonLearnset pokemonLearnset) {
        if (this.pokemons.size() <= 6) {
            this.pokemons.add(pokemonLearnset);
        } else {
            System.out.println("No es poden afegir més Pokémon a l'equip.");
        }
    }

    public void removePokemonLearnset(PokemonLearnset pokemonLearnset) {
        this.pokemons.remove(pokemonLearnset);
    }

    public void setAcePokemon(String acePokemon) {
        if (this.pokemons.stream().anyMatch(pokemonLearnset -> pokemonLearnset.getPokemon().getName().equals(acePokemon))) {
            this.acePokemon = acePokemon;
        } else {
            System.out.println("El Pokémon no forma part de l'equip.");
        }
    }
}