package org.example.travelguide.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Category extends  IdClass{
    private String categoryName;

    @OneToMany(mappedBy = "category",cascade = CascadeType.PERSIST)
    private List<Destination> destinations = new ArrayList<>();

    public void  addDestination(Destination destination){
        destinations.add(destination);
        destination.setCategory(this);
    }

    public Category(String categoryName) {
        this.categoryName = categoryName;
    }
}
