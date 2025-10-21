package org.example.travelguide.controller;

import lombok.RequiredArgsConstructor;
import org.example.travelguide.dto.LoginRequest;
import org.example.travelguide.dto.RegisterDto;
import org.example.travelguide.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    record ChangeUserInfo(String username,String password){ }

    //localhost:8080/api/auth/change-password
    @PutMapping("/change-password")
    public ResponseEntity<String> userInfoChange(@RequestBody ChangeUserInfo changeUserInfo){
        String responseString = authService.userInfoChange(changeUserInfo.username(),changeUserInfo.password());
        return ResponseEntity.status(HttpStatus.OK).body(responseString);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest){
        String responseString = authService.login(loginRequest);
        return ResponseEntity.status(HttpStatus.OK).body(responseString);
    }

    @PostMapping("/register/{accountType}")
    public ResponseEntity<String> register(@RequestBody RegisterDto registerDto,@PathVariable("accountType") String accountType){
        String responseString = authService.register(registerDto,accountType);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseString);
    }
}
