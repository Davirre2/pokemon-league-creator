package com.pokemonmanager.backend.util.repositories;

import com.pokemonmanager.backend.domain.Move;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MoveRepository extends JpaRepository<Move, Long> {
    Optional<Move> findByName(String name);
}