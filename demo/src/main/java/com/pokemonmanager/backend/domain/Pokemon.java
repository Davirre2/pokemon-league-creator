package com.pokemonmanager.backend.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Pokemon {
    @Id
    private Integer id;

    private String name;

    private Integer dexNumber;

    private String imageUrl;

    @ElementCollection
    @CollectionTable(name="pokemon_types", joinColumns = @JoinColumn(name="pokemon_id"))
    @Column(name="type_name")
    private List<String> types;

    @ElementCollection
    @CollectionTable(name = "pokemon_abilities", joinColumns = @JoinColumn(name = "pokemon_id"))
    @Column(name = "ability_name")
    private List<String> ability;

    @ManyToMany
    @JoinTable(
            name = "pokemon_moves",
            joinColumns = @JoinColumn(name = "pokemon_id"),
            inverseJoinColumns = @JoinColumn(name = "move_id")
    )
    private Set<Move> moves;
    private Integer generation;
}
