package com.pokemonmanager.backend.domain;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GymTeam {
    private Integer id;
    private Integer gymNumber; //Hauré de mirar si ho puc limitar d'alguna manera
    private List<Pokemon> team;
}
