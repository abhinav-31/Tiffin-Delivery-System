package com.tiffin.service;

import com.tiffin.dto.SignInResDTO;
import com.tiffin.dto.UserSignInReqDTO;
import com.tiffin.security.CustomUserDetails;
import com.tiffin.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtils jwtUtils;

    public SignInResDTO authenticateUser(UserSignInReqDTO userSignIn) {
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                userSignIn.getEmail(), userSignIn.getPassword());
        Authentication authentication = authManager.authenticate(token);

        // Extracting user details from the authenticated token
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        String role = userDetails.getAuthorities().toString().replaceAll("[\\[\\]]", "");
        String email = userDetails.getUsername();
        String name = userDetails.getFirstName();
        Long id = userDetails.getUserId();

        // Creating and returning the response DTO
        return new SignInResDTO(
                jwtUtils.generateJwtToken(authentication), 
                "Successful Auth!", 
                role, 
                email, 
                name,
                id);
    }
}
