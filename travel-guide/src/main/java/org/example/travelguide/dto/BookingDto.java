package org.example.travelguide.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.example.travelguide.entity.Status;

import java.math.BigDecimal;
import java.time.LocalDate;


public record BookingDto(int travellerCount,
                         LocalDate bookingDate,
                         Status status,
                         String username,
                         long destinationId,
                         BigDecimal fees) {}
