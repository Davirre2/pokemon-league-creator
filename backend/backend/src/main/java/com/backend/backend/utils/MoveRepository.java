package com.backend.backend.utils;

import com.backend.backend.domain.Move;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MoveRepository extends JpaRepository<Move, Long> {
    Optional<Move> findByName(String name);
}
