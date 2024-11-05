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
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebSecurity
@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {


  
	
        @Autowired
        private JwtAuthenticationFilter jwtFilter;

        @Autowired
        private CustomAuthenticationEntryPoint authEntry;

        private static final String[] PUBLIC_ENDPOINTS = {
                        "/users/vendorSignup",
                        "/users/deliveryBoySignup",
                        "/users/signup",
                        "/users/signin",
                        "/v*/api-doc*/**",
                        "/swagger-ui/**",
                        "/home",
                        "/viewMenuOfVendor/{vendorId}",
                        "/orders/customerOrderHistory",
                        "/home/vendorMenuList",
                        "/deliveryCharges/{customerPincode}/{vendorPincode}",
                        "/topic/orders/",
                        "/ws/**",
                        
        };

        private static final String[] VENDOR_ENDPOINTS = {
                        "/menus/**",
                        "/users/welcome",
                        "/orders/{vendorId}"
        };

        private static final String[] CUSTOMER_ENDPOINTS = {
                        "/users/addCustomerAddresses**",
                        "/orders/addOrder/{vendorId}",
                        "/orders/addReview/{orderId}",
                        "/users/getCustomerAddresses",
                       
        };

        private static final String[] DELIVERY_BOY_ENDPOINTS = {
                        "/orders/changeStatus/**",
                        "/orders/deliveryBoy"
        };

        private static final String[] ADMIN_ENDPOINTS = {
                        "/admin/**" ,"/admin/allReviews"
        };

        @Bean
        SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http.cors(withDefaults())
                                .csrf(csrf -> csrf.disable())
                                .exceptionHandling(handling -> handling.authenticationEntryPoint(authEntry))
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers(PUBLIC_ENDPOINTS).permitAll()
                                                .requestMatchers(HttpMethod.OPTIONS).permitAll()
                                                // Place the DELIVERY_BOY_ENDPOINTS before CUSTOMER_ENDPOINTS
                                                .requestMatchers(DELIVERY_BOY_ENDPOINTS).hasRole("DELIVERY_BOY")
                                                .requestMatchers(VENDOR_ENDPOINTS).hasRole("VENDOR")
                                                .requestMatchers(CUSTOMER_ENDPOINTS).hasRole("CUSTOMER")
                                                .requestMatchers(ADMIN_ENDPOINTS).hasRole("ADMIN")
                                                .anyRequest().authenticated())
                                .sessionManagement(management -> management
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
                return config.getAuthenticationManager();
        }

    @Bean
    PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }
}
