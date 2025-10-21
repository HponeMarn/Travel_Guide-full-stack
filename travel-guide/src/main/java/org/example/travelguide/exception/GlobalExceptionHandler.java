package org.example.travelguide.exception;

import java.time.LocalDateTime;

import org.example.travelguide.exception.ApiError;
import org.example.travelguide.exception.RegisterAccountTypeError;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import jakarta.persistence.EntityNotFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler
        extends ResponseEntityExceptionHandler{

    @ExceptionHandler({RegisterAccountTypeError.class})
    public ResponseEntity<Object> exceptionHandler(
            Exception ex,
            WebRequest request)
            throws Throwable{
        return handleExceptionInternal(ex,message(ex),
                new HttpHeaders(),HttpStatus.BAD_REQUEST,request);
    }

    private ApiError message(Exception ex) {
            return new ApiError(
                    HttpStatus.BAD_REQUEST.value()
                    , ex.getMessage(),
                    LocalDateTime.now());
        }


        @Override
        protected ResponseEntity<Object> handleMissingServletRequestParameter(MissingServletRequestParameterException ex,
                HttpHeaders headers, HttpStatusCode status, WebRequest request) {
            // TODO Auto-generated method stub
            return handleExceptionInternal(ex, message(ex), headers, HttpStatus.BAD_REQUEST, request);
        }

        @Override
        protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
                HttpHeaders headers, HttpStatusCode status, WebRequest request) {
            // TODO Auto-generated method stub
            return handleExceptionInternal(ex, message(ex), headers, HttpStatus.BAD_REQUEST, request);
    }




}
