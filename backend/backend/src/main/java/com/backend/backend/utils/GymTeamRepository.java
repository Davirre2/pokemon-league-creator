package com.backend.backend.utils;

import com.backend.backend.domain.GymTeam;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GymTeamRepository extends JpaRepository<GymTeam, Integer> {
}
