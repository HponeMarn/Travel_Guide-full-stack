package org.example.travelguide.dao;

import org.example.travelguide.entity.Guide;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;


import java.util.Optional;

public interface GuideDao extends JpaRepository<Guide,Long> {

    Optional<Guide> findByUsername(String username);

    @Query("select g from Guide g join g.destinations d where d.id = :destinationId")
    Optional<Guide> findByDestinationId(Long destinationId);


}
