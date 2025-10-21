package org.example.travelguide.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Destination extends IdClass{
    private String title;
    private BigDecimal fees;
    private String description;
    private LocalDate startDate;
    private LocalDate endDate;
    @Lob
    private byte[] image;

    @OneToMany(mappedBy ="destination",cascade = CascadeType.PERSIST)
    private List<Booking> bookings = new ArrayList<>();

    public void addBooking(Booking booking){
        this.bookings.add(booking);
        booking.setDestination(this);
    }


    @OneToMany(mappedBy ="destination",cascade = CascadeType.ALL)
    private List<TravellerDestination> travellerDestinations=new ArrayList<>();

    @ElementCollection(fetch = FetchType.LAZY)
    @CollectionTable(name = "destination_palace")
    private List<DestinationPalace> destinationPalaces=new ArrayList<>();
    @ManyToOne
    private Guide guide;
    @ManyToOne
    private Category category;



    public void addDestinationPalace(String palaceName,
                                     String palaceDescription,byte[] palaceImage){
        this.destinationPalaces.add(new DestinationPalace(palaceName,palaceDescription,palaceImage));
    }




}
