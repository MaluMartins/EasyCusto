package com.easycusto.easycusto.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.easycusto.easycusto.exceptions.EntityNotFoundException;
import com.easycusto.easycusto.models.Salario;
import com.easycusto.easycusto.models.Usuario;
import com.easycusto.easycusto.repositories.SalarioRepository;
import com.easycusto.easycusto.utils.UserUtil;

@Service
public class SalarioService {
	@Autowired
	SalarioRepository salarioRepository;
	
	@Autowired
    private UsuarioService usuarioService; 

    public Salario buscarSalarioAtual() {
        String username = UserUtil.getCurrentUsername();
        Usuario usuario = usuarioService.buscarPorUsername(username);

        Optional<Salario> salario = salarioRepository.findByUsuarioIdUsuario(usuario.getIdUsuario());
        return salario.orElse(null); 
    }
	
	public Salario findById(Long id) {
		return salarioRepository.findById(id).orElseThrow(
				() -> new EntityNotFoundException("Id not found: " + id));
	}
	
	
}
