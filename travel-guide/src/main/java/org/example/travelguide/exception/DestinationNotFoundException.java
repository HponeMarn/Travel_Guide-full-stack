package org.example.travelguide.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class DestinationNotFoundException extends ResponseStatusException {
    public DestinationNotFoundException(String s) {
        super(HttpStatus.NOT_FOUND,s);
    }
}
