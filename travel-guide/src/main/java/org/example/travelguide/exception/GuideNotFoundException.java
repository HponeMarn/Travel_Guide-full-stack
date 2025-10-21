package org.example.travelguide.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

public class GuideNotFoundException extends ResponseStatusException {
    public GuideNotFoundException(String message) {
        super(HttpStatus.NOT_FOUND,message);
    }
}
