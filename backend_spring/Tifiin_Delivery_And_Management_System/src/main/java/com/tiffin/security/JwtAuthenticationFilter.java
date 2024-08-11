//package com.tiffin.security;
//
//import java.io.IOException;
//import java.util.List;
//
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.stereotype.Component;
//import org.springframework.web.filter.OncePerRequestFilter;
//
//import io.jsonwebtoken.Claims;
//
//@Component // spring bean : can be injected in other spring beans
//public class JwtAuthenticationFilter extends OncePerRequestFilter {
//	// token verification
//	// dep : JWT utils
//	@Autowired
//	private JwtUtils utils;
//
//	@Override
//	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
//			throws ServletException, IOException {
//		// check auth header from incoming request
//		String authHeader = request.getHeader("Authorization");
//		if (authHeader != null && authHeader.startsWith("Bearer ")) {
//			// => req header contains JWT
//			String jwt = authHeader.substring(7);
//			System.out.println(jwt);
//			// validate JWT
//			Claims payloadClaims = utils.validateJwtToken(jwt);
//			System.out.println(payloadClaims);
//			// get user name from the claims
//			String email = utils.getUserNameFromJwtToken(payloadClaims);
//			System.out.println(email);
//			// get granted authorities as a custom claim
//
//			List<GrantedAuthority> authorities = utils.getAuthoritiesFromClaims(payloadClaims);
//			// add username/email n granted authorities in Authentication object
//			UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(email, null,
//					authorities);
//			// save this auth token under spring sec so that subsequent filters will NOT
//			// retry the auth again
//			SecurityContextHolder.getContext().setAuthentication(token);
//			System.out.println("saved auth token in sec ctx");
//		}
//		filterChain.doFilter(request, response);// to continue with remaining chain of spring sec filters
//
//	}
//
//}
package com.tiffin.security;

import java.io.IOException;
import java.util.List;

import jakarta.*;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import io.jsonwebtoken.Claims;

@Component
@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtils utils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String jwt = authHeader.substring(7);
            try {
                Claims payloadClaims = utils.validateJwtToken(jwt);
                String email = utils.getUserNameFromJwtToken(payloadClaims);
                List<GrantedAuthority> authorities = utils.getAuthoritiesFromClaims(payloadClaims);
                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(email, null, authorities);
                SecurityContextHolder.getContext().setAuthentication(token);
                log.info("Saved auth token in sec ctx");
            } catch (Exception e) {
                log.error("Failed to validate JWT token", e);
            }
        }
        filterChain.doFilter(request, response);
    }
}

