package com.backend.backend.domain;

import jakarta.persistence.Entity;
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
    private Pokemon pokemon;
    private List<Move> moves;

    public void setMove(Move move, int index) {
        this.moves.set(index, move);
    }
}
