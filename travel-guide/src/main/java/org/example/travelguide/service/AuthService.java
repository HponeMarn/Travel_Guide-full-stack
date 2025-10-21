package org.example.travelguide.service;

import jakarta.persistence.Column;
import lombok.RequiredArgsConstructor;
import org.example.travelguide.dao.GuideDao;
import org.example.travelguide.dao.RoleDao;
import org.example.travelguide.dao.TravellerDao;
import org.example.travelguide.dao.UserDao;
import org.example.travelguide.dto.LoginRequest;
import org.example.travelguide.dto.RegisterDto;
import org.example.travelguide.entity.Guide;
import org.example.travelguide.entity.Role;
import org.example.travelguide.entity.Traveller;
import org.example.travelguide.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service

public class AuthService {

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private RoleDao roleDao;
    @Autowired
    private TravellerDao travellerDao;
    @Autowired
    private GuideDao guideDao;
    @Autowired
    private UserDao userDao;

   public String userInfoChange(String username,String password){
      User userOptional = userDao.findByUsername(username).orElse(null);
       if (Objects.nonNull(userOptional)) {

           userOptional.setPassword(passwordEncoder.encode(password));
           userDao.save(userOptional);
           return "Password changed successfully";
       } else {
           return "User not found";
       }
   }

    public String login(LoginRequest loginRequest){
        var auth=new UsernamePasswordAuthenticationToken(loginRequest.username()
                , loginRequest.password());
        Authentication authentication=authenticationManager
                .authenticate(auth);
        SecurityContextHolder
                .getContext().setAuthentication(authentication);
        StringBuilder sb=new StringBuilder();
        for(GrantedAuthority authority
                :authentication.getAuthorities()) {
            sb.append(authority.getAuthority());
        }
        return sb.toString();
    }

    public String register(RegisterDto registerDto,String accountType){
        if ("guide".equalsIgnoreCase(accountType)){
            Role role = roleDao.findByRoleName("ROLE_GUIDE").orElse(null);
            if (role == null){
                role = new Role();
                role.setRoleName("ROLE_GUIDE");
            }

            var guide = new Guide(registerDto.getFirstName(),
                    registerDto.getLastName(),
                    registerDto.getEmail(),
                    registerDto.getUsername(),
                    passwordEncoder.encode(registerDto.getPassword()),
                    registerDto.getNetWorth().valueOf(0));

            Optional.of(registerDto.getGoodAtDestinations())
                    .ifPresent( destinations ->{
                for(String good : destinations){
                    guide.addGoodAtDestination(good);
                }
            });
            guide.addRole(role);
            guideDao.save(guide);
            return "successfully Register";

        }

        else if ("traveller".equalsIgnoreCase(accountType)) {
            Role role = roleDao.findByRoleName("ROLE_TRAVELLER").orElse(null);
            if (role == null){
                role = new Role();
                role.setRoleName("ROLE_TRAVELLER");
            }

           var traveller = new Traveller(registerDto.getFirstName(),
                   registerDto.getLastName(),
                   registerDto.getEmail(),
                   registerDto.getUsername(),
                   passwordEncoder.encode(registerDto.getPassword()),0);
            traveller.addRole(role);
            travellerDao.save(traveller);

            return "successfully register";
        }
        else {
            return "invalid account type";
        }


    }

}
