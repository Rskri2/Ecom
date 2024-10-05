package com.example.WebApplication.config;

import com.example.WebApplication.service.JwtService;
import com.example.WebApplication.service.MyUserDetailsService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.SignatureException;

@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    JwtService jwtService;
    @Autowired
    ApplicationContext context;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
         final String authHeader = request.getHeader("Authorization");
         String token = null;
         String username = null;

             if (authHeader != null && authHeader.startsWith("Bearer ")) {
                 token = authHeader.substring(7);
                 username = jwtService.extractUserName(token);
             }

             if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                 UserDetails userDetails = context.getBean(MyUserDetailsService.class).loadUserByUsername(username);
                 if (jwtService.validateToken(token, userDetails)) {
                     UsernamePasswordAuthenticationToken authenticationToken =
                             new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                     authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                     request.setAttribute("username", username);

                     SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                 }

             }


         filterChain.doFilter(request, response);
    }


}
