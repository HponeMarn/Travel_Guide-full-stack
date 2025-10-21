package org.example.travelguide.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("GUIDE")
public class Guide extends User{

    @ElementCollection
    @CollectionTable(name = "good_at_destinations")
    private List<String> goodAtDestinations = new ArrayList<>();
    private BigDecimal netWorth;

    @OneToMany(mappedBy = "guide",cascade = CascadeType.PERSIST)
    private List<Destination> destinations = new ArrayList<>();

    public void addDestination(Destination destination){
        destinations.add(destination);
        destination.setGuide(this);
    }


    public void addGoodAtDestination(String destination){
        this.goodAtDestinations.add(destination);

    }


    public Guide(String firstName, String lastName, String email, String username, String password, BigDecimal netWorth) {
        super(firstName, lastName, email, username, password);
        this.netWorth = netWorth;
    }
}
