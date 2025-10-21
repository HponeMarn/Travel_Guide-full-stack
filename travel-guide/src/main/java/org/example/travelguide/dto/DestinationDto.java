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
@NoArgsConstructor
@ToString
public class DestinationDto {
    private Long destinationId;
    private String title;
    private String description;
    private BigDecimal fees;
    private String imageBase64;
    private LocalDate startDate;
    private LocalDate endDate;
    private String category;
    private String guideName;

    public DestinationDto(Long destinationId, String title, String description, BigDecimal fees, byte[] imageBase64,LocalDate startDate,LocalDate endDate,String guideName, String category) {
        this.destinationId = destinationId;
        this.title = title;
        this.description = description;
        this.fees = fees;
        this.imageBase64 = imageBase64==null?null: Base64.getEncoder().encodeToString(imageBase64);
        this.startDate = startDate;
        this.endDate = endDate;
        this.category = category;
        this.guideName = guideName;

    }
}
