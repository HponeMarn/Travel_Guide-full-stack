package org.example.travelguide.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Base64;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class PlaceDto {
    private Long destinationId;
    private String placeName;
    private String placeDescription;
    private String placeImageBase64;
    private String destinationTitle;
    private String destinationImageBase64;
    private LocalDate startDate;
    private LocalDate endDate;
    private BigDecimal fees;
    private String guideUsername;

    public  PlaceDto(Long destinationId, String placeName, String placeDescription, byte[] placeImageBase64, String destinationTitle,byte[] destinationImageBase64,LocalDate startDate,LocalDate endDate,BigDecimal fees,String guideUsername) {
        this.destinationId = destinationId;
        this.placeName = placeName;
        this.placeDescription = placeDescription;
        this.placeImageBase64 = placeImageBase64==null? null: Base64.getEncoder().encodeToString(placeImageBase64);
        this.destinationTitle = destinationTitle;
        this.destinationImageBase64 = destinationImageBase64==null? null: Base64.getEncoder().encodeToString(destinationImageBase64);
        this.startDate = startDate;
        this.endDate = endDate;
        this.fees = fees;
        this.guideUsername = guideUsername;

    }



}
