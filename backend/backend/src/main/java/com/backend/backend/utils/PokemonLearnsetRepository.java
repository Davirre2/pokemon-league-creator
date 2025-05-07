package com.backend.backend.utils;

import com.backend.backend.domain.PokemonLearnset;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PokemonLearnsetRepository extends JpaRepository<PokemonLearnset, Integer> {

}
