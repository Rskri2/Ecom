package com.example.WebApplication.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.*;
import java.util.function.Function;

@Service
public class JwtService {
    private String key;
    public JwtService(){
        try {
            KeyGenerator gen = KeyGenerator.getInstance("HmacSHA256");
            SecretKey sk = gen.generateKey();
            key = Base64.getEncoder().encodeToString(sk.getEncoded());
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
    private SecretKey getKey() {
        byte[] sb = Decoders.BASE64.decode(key);
        return Keys.hmacShaKeyFor(sb);
    }
    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    private boolean isTokenExpired(String token){
        return extractDate(token).before(new Date());
    }
    private Date extractDate(String token){
        return extractClaim(token, Claims::getExpiration);
    }
    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }
    private Claims extractAllClaims(String token){
        return Jwts.parser().verifyWith(getKey()).build().parseSignedClaims(token).getPayload();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUserName(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token)) ;
    }

    public String generateToken(String username) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .claims()
                .add(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+ 60*60*1000*24*20))
                .and()
                .signWith(getKey())
                .compact();
    }
}
