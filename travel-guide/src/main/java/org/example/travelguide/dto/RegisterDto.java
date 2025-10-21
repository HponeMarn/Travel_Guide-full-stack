package org.example.travelguide.dto;

import jakarta.persistence.Column;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor

public class RegisterDto {
    private String firstName;
    private  String lastName;
    private  String email;
    private String username;
    private  String password;

    private List<String> goodAtDestinations;
    private BigDecimal netWorth;

    private int discount;
}
