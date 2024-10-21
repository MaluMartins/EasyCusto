package com.easycusto.easycusto.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easycusto.easycusto.dtos.AuthenticationDTO;
import com.easycusto.easycusto.dtos.LoginResponseDTO;
import com.easycusto.easycusto.dtos.RegisterDTO;
import com.easycusto.easycusto.models.Usuario;
import com.easycusto.easycusto.repositories.UsuarioRepository;
import com.easycusto.easycusto.services.TokenService;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("auth")
public class AuthenticationController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@Autowired
	TokenService tokenService;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody @Valid AuthenticationDTO data) {
		try {
            var usernamePassword = new UsernamePasswordAuthenticationToken(data.username(), data.senha());
            var auth = this.authenticationManager.authenticate(usernamePassword);
            
            var token = tokenService.generateToken((Usuario) auth.getPrincipal());
            
            return ResponseEntity.ok(new LoginResponseDTO(token));
        } catch (Exception e) {
            return ResponseEntity.status(403).body("Usuário ou senha inválidos.");
        }
	}
	
	@PostMapping("/registrar")
	public ResponseEntity<?> register(@RequestBody @Valid RegisterDTO data) {
		if(this.usuarioRepository.findByUsername(data.username()) != null) {
			return ResponseEntity.badRequest().body("Nome de usuário já está sendo usado.");
		}
		if (data.senha().length() > 0 && data.senha().length() < 8) {
			return ResponseEntity.badRequest().body("A senha deve ter pelo menos 8 caracteres");
		}
		
		String encryptedPassword = new BCryptPasswordEncoder().encode(data.senha());
		Usuario newUser = new Usuario(data.username(), encryptedPassword, data.role());
		
		this.usuarioRepository.save(newUser);
		
		return ResponseEntity.ok().build();
	}
}
