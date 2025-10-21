package org.example.travelguide.entity;

import jakarta.persistence.Embeddable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
public class DestinationPalace {
    private String placeName;
    private String placeDescription;
    @Lob
    private byte[] placeImage;

    public DestinationPalace(String placeName, String placeDescription, byte[] placeImage) {
        this.placeName = placeName;
        this.placeDescription = placeDescription;
        this.placeImage = placeImage;
    }
}
