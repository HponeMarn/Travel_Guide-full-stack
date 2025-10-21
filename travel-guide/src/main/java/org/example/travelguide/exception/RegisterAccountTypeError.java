package org.example.travelguide.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.web.server.ResponseStatusException;

public class RegisterAccountTypeError extends ResponseStatusException {
    public RegisterAccountTypeError( String reason) {
        super(HttpStatus.BAD_REQUEST, reason);
    }
}
