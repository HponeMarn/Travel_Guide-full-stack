package org.example.travelguide.dao;

import org.example.travelguide.dto.BookingDto;
import org.example.travelguide.dto.BookingResponse;
import org.example.travelguide.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BookingDao extends JpaRepository<Booking,Long> {

    @Query("""
SELECT new org.example.travelguide.dto.BookingResponse(b.id,b.travellerCount, b.bookingDate, b.status, b.traveller.username, b.destination.title,b.destination.guide.username,b.fees,b.destination.id) FROM Booking b
""")
    List<BookingResponse> findAllBooking();

    @Query("""
    SELECT new org.example.travelguide.dto.BookingResponse(b.id,b.travellerCount, b.bookingDate, b.status, b.traveller.username, b.destination.title,b.destination.guide.username,b.fees,b.destination.id) FROM Booking b where b.traveller.username = :username order by b.id desc
""")
    List<BookingResponse> findBookingByUsername(String username);

    @Query("""
    select new org.example.travelguide.dto.BookingResponse(
        b.id,
        b.travellerCount,
        b.bookingDate,
        b.status,
        b.traveller.username,
        b.destination.title,
        b.destination.guide.username,
        b.fees,
        b.destination.id
    ) 
    FROM Booking b 
    join b.destination d 
    join d.guide g 
    where b.destination.guide.username = :username order by b.id desc
""")
List<BookingResponse> findBookingByGuideName(String username);
}





