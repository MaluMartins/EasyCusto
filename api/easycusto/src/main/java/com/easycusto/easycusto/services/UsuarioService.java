package com.easycusto.easycusto.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.easycusto.easycusto.exceptions.EntityNotFoundException;
import com.easycusto.easycusto.models.Usuario;
import com.easycusto.easycusto.repositories.UsuarioRepository;

@Service
public class UsuarioService {
	@Autowired
	UsuarioRepository usuarioRepository;
	
	public Usuario findById(Long id) {
		return usuarioRepository.findById(id).orElseThrow(
				() -> new EntityNotFoundException("Id not found: " + id));
	}

	public Usuario buscarPorUsername(String username) {
        return usuarioRepository.findByUsername(username);
    }
}
