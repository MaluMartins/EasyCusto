package com.easycusto.easycusto.models;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.io.Serializable;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import jakarta.persistence.*;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "usuario")
public class Usuario implements Serializable, UserDetails {
	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idUsuario")
	private Long id_usuario;
	
	@Column(name = "username", nullable = false, unique = true, length = 100)
	private String username;
	
	@Column(name = "senha", nullable = false, length = 100)
	private String senha;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "role")
	private Role role;
	
	public enum Role {
		FREE, PREMIUM
	}
	
	public Usuario(String username, String senha, Role role) {
		this.username = username;
		this.senha = senha;
		this.role = role;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		if(this.role == Role.PREMIUM) {
			return List.of(new SimpleGrantedAuthority("ROLE_PREMIUM"), new SimpleGrantedAuthority("ROLE_FREE"));
		} else { 
			return List.of(new SimpleGrantedAuthority("ROLE_FREE"));
		}
	}
	
	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public String getPassword() {
		return senha;
	}
	

}
