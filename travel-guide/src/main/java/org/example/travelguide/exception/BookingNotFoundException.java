package org.example.travelguide.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class BookingNotFoundException extends ResponseStatusException {
    public BookingNotFoundException(String message) {

        super(HttpStatus.NOT_FOUND, message);
    }
}
