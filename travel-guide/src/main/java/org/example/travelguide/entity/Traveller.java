package org.example.travelguide.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("TRAVELLER")
public class Traveller extends User{

    private int discount;

    @OneToMany(mappedBy = "traveller",cascade = CascadeType.PERSIST)
    private List<Booking> bookings = new ArrayList<>();

    public void addBooking(Booking booking){
        this.bookings.add(booking);
        booking.setTraveller(this);
    }

    @ElementCollection
    @CollectionTable(name = "completed_destinations")
    private List<String> completedDestinations;

    public void addCompletedDestination(String destination){
        this.completedDestinations.add(destination);
    }

    @OneToMany(mappedBy = "traveller",cascade = CascadeType.PERSIST)
    private List<TravellerDestination> travellerDestinations;

    public Traveller(int discount) {
        this.discount = discount;
    }

    public Traveller(String firstName, String lastName, String email, String username, String password, int discount) {
        super(firstName, lastName, email, username, password);
        this.discount = discount;
    }

    public void addTravellerDestination(TravellerDestination travellerDestination){
        this.travellerDestinations.add(travellerDestination);
        travellerDestination.setTraveller(this);
    }

}
