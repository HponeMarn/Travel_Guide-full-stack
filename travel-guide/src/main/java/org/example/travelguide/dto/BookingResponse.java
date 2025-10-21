package org.example.travelguide.dto;

import org.example.travelguide.entity.Status;

import java.math.BigDecimal;
import java.time.LocalDate;

public record BookingResponse(long bookingId,int travellerCount,
                              LocalDate bookingDate,
                              Status status,
                              String username,
                              String title,
                              String guideName,
                              BigDecimal fees,
                              long destinationId) {
}
