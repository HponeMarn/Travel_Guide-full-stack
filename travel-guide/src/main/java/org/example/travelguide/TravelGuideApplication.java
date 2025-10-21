package org.example.travelguide;

import lombok.RequiredArgsConstructor;
import org.example.travelguide.dao.SiteOwnerDao;
import org.example.travelguide.entity.Role;
import org.example.travelguide.entity.SiteOwner;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;

@SpringBootApplication
@RequiredArgsConstructor
public class TravelGuideApplication {

    private final SiteOwnerDao siteOwnerDao;

    private final PasswordEncoder passwordEncoder;


    @Bean
    @Profile("dev")
    public ApplicationRunner runner(){
        return args -> {
          SiteOwner siteOwner = new SiteOwner("richard", "Doe", "john.doe@example.com", "richard",passwordEncoder.encode("12345"), BigDecimal.valueOf(0));
          Role role = new Role();
          role.setRoleName("SITE_OWNER");
          siteOwner.addRole(role);
          siteOwnerDao.save(siteOwner);

        };
    }

    public static void main(String[] args) {
        SpringApplication.run(TravelGuideApplication.class, args);
    }

}
