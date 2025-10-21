package org.example.travelguide.dao;

import org.example.travelguide.entity.Traveller;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TravellerDao extends JpaRepository<Traveller,Long> {
    Optional<Traveller> findByUsername(String username);
}
