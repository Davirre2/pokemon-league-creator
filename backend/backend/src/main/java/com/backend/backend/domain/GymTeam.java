package com.backend.backend.domain;

import com.backend.backend.domain.Move;
import com.backend.backend.domain.Pokemon;
import com.backend.backend.domain.PokemonLearnset;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GymTeam {
    @Id
    private Integer id;
    @Min(1)
    @Max(18)
    private Integer gymNumber;
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name= "gym_id")
    private List<PokemonLearnset> pokemons;
    private String acePokemon;
    private String gymType;

    public void addPokemonLearnset(PokemonLearnset pokemonLearnset) {
        if(this.pokemons.size() <= 6){
            this.pokemons.add(pokemonLearnset);
        } else {
            System.out.println("No es poden afegir més Pokémon a l'equip.");
        }
    }

    public void removePokemonLearnset(PokemonLearnset pokemonLearnset) {
        this.pokemons.remove(pokemonLearnset);
    }

    public void setAcePokemon(String acePokemon) {
        if(this.pokemons.stream().anyMatch(pokemonLearnset -> pokemonLearnset.getPokemon().getName().equals(acePokemon))) {
            this.acePokemon = acePokemon;
        } else {
            System.out.println("El Pokémon no forma part de l'equip.");
        }
    }
}
