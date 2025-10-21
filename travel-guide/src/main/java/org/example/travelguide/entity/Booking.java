package org.example.travelguide.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.travelguide.dto.DestinationDto;

import java.math.BigDecimal;
import java.time.LocalDate;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class Booking extends IdClass{

    private int travellerCount;
    private LocalDate bookingDate;
    @Enumerated(EnumType.STRING)
    private Status status;
    private BigDecimal fees;

    @ManyToOne
    private Traveller traveller;
    @ManyToOne
    private Destination destination;

    public Booking(int travellerCount, LocalDate bookingDate) {
        this.travellerCount = travellerCount;
        this.bookingDate = bookingDate;
    }
}
