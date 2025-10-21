package org.example.travelguide.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class TravellerDestination extends IdClass{

    private LocalDate bookingDate;
    private int completed;

    @ManyToOne
    private Traveller traveller;

    @ManyToOne
    private Destination destination;
}
