package com.easycusto.easycusto.securityConfig;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.easycusto.easycusto.repositories.UsuarioRepository;
import com.easycusto.easycusto.services.TokenService;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class SecurityFilter extends OncePerRequestFilter {
	
	@Autowired
	TokenService tokenService;
	
	@Autowired
	UsuarioRepository usuarioRepository;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		String path = request.getRequestURI();

		if (path.equals("/auth/registrar") || path.equals("/auth/login")) {
	        filterChain.doFilter(request, response);
	        return;
	    }
		
		var token = this.recoverToken(request);
		
		if(token != null) {
			var username = tokenService.validateToken(token);
			
			UserDetails user = usuarioRepository.findByUsername(username);
			
			var authentication = new UsernamePasswordAuthenticationToken(username, null, user.getAuthorities());
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}
		
		filterChain.doFilter(request, response);
	}
	
	private String recoverToken(HttpServletRequest request) {
		var authHeader = request.getHeader("Authorization");
		
		if (authHeader == null) {
			return null;
		}
		
		return authHeader.replace("Bearer ", "");
	}

}
