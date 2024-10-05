package com.example.WebApplication.controller;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import java.security.SignatureException;

@ControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(ExpiredJwtException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseEntity<String> handleJwtError(ExpiredJwtException ex){
        return new ResponseEntity<>("Please log in again", HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(SignatureException.class)
    public ResponseEntity<String> handleJwtError(SignatureException ex){
        return new ResponseEntity<>("Please log in again", HttpStatus.UNAUTHORIZED);
    }
    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity<String> handleMalformedJwt(MalformedJwtException ex){
        return new ResponseEntity<>("Please log in again", HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidationError(MethodArgumentNotValidException ex){
        return new ResponseEntity<>("Error"+ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ConstraintViolationException.class )
    public ResponseEntity<String> handleDatabaseError(ConstraintViolationException ex){
        return new ResponseEntity<>("Please log in again" + ex.getMessage(), HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralError(Exception ex){
        return new ResponseEntity<>("Internal server error" +ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
