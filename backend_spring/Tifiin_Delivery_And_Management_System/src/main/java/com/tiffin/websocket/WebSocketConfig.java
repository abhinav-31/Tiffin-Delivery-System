package com.tiffin.websocket;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

import com.tiffin.security.JwtUtils;

import io.jsonwebtoken.Claims;



@Configuration
@EnableWebSocketMessageBroker
@Order(Ordered.HIGHEST_PRECEDENCE + 99)
@CrossOrigin
@RequiredArgsConstructor
@Slf4j
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    private final JwtUtils jwtTokenUtil;
//    private final UserDetailsServiceImpl userDetailsService;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
        .setAllowedOrigins("http://localhost:3000")
        .withSockJS();
        registry.addEndpoint("/ws");
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic");
        registry.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor =
                        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                log.info("Headers: {}", accessor);

                assert accessor != null;
                if (StompCommand.CONNECT.equals(accessor.getCommand())) {
                    String authorizationHeader = accessor.getFirstNativeHeader("Authorization");
                    if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                        String token = authorizationHeader.substring(7);

                        try {
                            // Validate the token and extract claims
                            Claims claims = jwtTokenUtil.validateJwtToken(token);
                            String username = jwtTokenUtil.getUserNameFromJwtToken(claims);
                            List<GrantedAuthority> authorities = jwtTokenUtil.getAuthoritiesFromClaims(claims);

                            // Create authentication token and set it in the security context
                            UsernamePasswordAuthenticationToken authentication = 
                                    new UsernamePasswordAuthenticationToken(username, null, authorities);
                            SecurityContextHolder.getContext().setAuthentication(authentication);

                            // Set the user in the StompHeaderAccessor
                            accessor.setUser(authentication);
                        } catch (Exception e) {
                            log.error("JWT token validation failed: {}", e.getMessage());
                            // Optionally handle invalid token scenario, e.g., throw an exception or set an error state
                        }
                    }
                }

                return message;
            }
        });
    }

}