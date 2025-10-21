package org.example.travelguide.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class TravellerNotFoundException extends ResponseStatusException {
    public TravellerNotFoundException(String message) {
        super(HttpStatus.BAD_REQUEST, message);

    }
}
