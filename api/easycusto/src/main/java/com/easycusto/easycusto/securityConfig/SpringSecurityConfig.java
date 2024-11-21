package com.easycusto.easycusto.securityConfig;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableMethodSecurity
@EnableWebMvc
@Configuration
public class SpringSecurityConfig {
	
	@Autowired
	SecurityFilter securityFilter;

	@Bean
    public SecurityFilterChain SecurityFilterChain(HttpSecurity http) throws Exception {
		return http
				.cors(cors -> cors.configurationSource(request -> {
		            var corsConfig = new org.springframework.web.cors.CorsConfiguration();
		            corsConfig.setAllowedOrigins(List.of("http://localhost:5173"));
		            corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		            corsConfig.setAllowedHeaders(List.of("Authorization", "Content-Type"));
		            return corsConfig;
		        }))
		        .csrf(csrf -> csrf.disable())
		        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		        .authorizeHttpRequests(
		        		auth -> auth.requestMatchers(HttpMethod.POST, "/auth/login").permitAll()
		        		.requestMatchers(HttpMethod.POST, "/auth/registrar").permitAll()
		        		.requestMatchers(HttpMethod.POST, "/ingredientes/**").permitAll()
		        		.requestMatchers(HttpMethod.POST, "/receitas/**").permitAll()
		        		.requestMatchers(HttpMethod.POST, "/taxas/").permitAll()
		        .anyRequest().permitAll()
		        		)
		        .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
		        .build();
	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}
	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
