package org.example.travelguide.entity;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@NoArgsConstructor
@DiscriminatorValue("SITE_OWNER")
public class SiteOwner extends  User
{
    private BigDecimal platFormFee;

    public SiteOwner(BigDecimal platFormFee) {
        this.platFormFee = platFormFee;
    }

    public SiteOwner(String firstName, String lastName, String email, String username, String password, BigDecimal platFormFee) {
        super(firstName, lastName, email, username, password);
        this.platFormFee = platFormFee;
    }
}
