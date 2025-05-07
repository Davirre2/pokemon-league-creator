package com.backend.backend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PokemonLearnset {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @OneToOne
    private Pokemon pokemon;

    @ManyToMany
    @JoinTable(
            name = "gym_pokemon_learnset_moves",
            joinColumns = @JoinColumn(name = "learnset_id"),
            inverseJoinColumns = @JoinColumn(name = "move_id")
    )
    private List<Move> moves;

    public int getPokemonId() {
        return this.pokemon.getId();
    }


    public void setMove(Move move, int index) {
        this.moves.set(index, move);
    }
}
