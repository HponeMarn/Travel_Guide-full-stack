package org.example.travelguide.dao;

import org.example.travelguide.entity.SiteOwner;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SiteOwnerDao extends JpaRepository<SiteOwner,Long> {
    Optional<SiteOwner> findByUsername(String username);
}
