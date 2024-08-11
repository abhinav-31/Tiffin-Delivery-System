package com.tiffin.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;

@EnableWebSecurity
@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {



    @Autowired
    private JwtAuthenticationFilter jwtFilter;

    @Autowired
    private CustomAuthenticationEntryPoint authEntry;

    @Bean
    public SecurityFilterChain authorizeRequests(HttpSecurity http) throws Exception {
        http.cors(withDefaults())
                .csrf(csrf -> csrf.disable())
                .exceptionHandling(handling -> handling.authenticationEntryPoint(authEntry))
                .authorizeHttpRequests(auth -> auth
                                .requestMatchers("/users/signup", "/users/customerSignIn", "/v*/api-doc*/**", "/swagger-ui/**").permitAll()
                                .requestMatchers(HttpMethod.OPTIONS).permitAll()
                                .requestMatchers("/users/addCustomerAddresses**").hasRole("CUSTOMER")
                                .anyRequest().authenticated()
                )
                .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
    @Bean
    public PasswordEncoder passwordEncoder() {
    	return new BCryptPasswordEncoder();
    }
}