package org.example.travelguide.dao;

import org.example.travelguide.dto.BookingDto;
import org.example.travelguide.dto.BookingResponse;
import org.example.travelguide.dto.DestinationDto;
import org.example.travelguide.dto.PlaceDto;
import org.example.travelguide.entity.Destination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface DestinationDao extends JpaRepository<Destination,Long> {

    Optional<Destination> findById(Long id);

    @Query("""
select new org.example.travelguide.dto.DestinationDto(
    d.id,
    d.title,
    d.description,
    d.fees,
    d.image,
    d.startDate,
    d.endDate,
    d.guide.username,
    c.categoryName)
from Destination d join d.category c join d.guide g
""")
    List<DestinationDto> findAllDestinations();

    @Query("""
 select new org.example.travelguide.dto.DestinationDto(
    d.id,
    d.title,
    d.description,
    d.fees,
    d.image,
    d.startDate,
    d.endDate,
    d.guide.username,
    c.categoryName)
from Destination d join d.category c join d.guide g where g.username = :username
""")
    List<DestinationDto> findDestinationsByGuideUsername(String username);



    @Query("""
     select new org.example.travelguide.dto.PlaceDto(
        d.id,
        p.placeName,
        p.placeDescription,
        p.placeImage,
        d.title,
        d.image,
        d.startDate,
        d.endDate,
        d.fees,
        d.guide.username
    )
    from Destination d
    join d.destinationPalaces p where d.id = :destinationId
""")
    List<PlaceDto> findAllPlacesByDestinationId(Long destinationId);




}
