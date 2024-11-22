package com.easycusto.easycusto.services;

import org.springframework.beans.factory.annotation.Autowired;

import com.easycusto.easycusto.exceptions.EntityNotFoundException;
import com.easycusto.easycusto.models.Salario;
import com.easycusto.easycusto.repositories.SalarioRepository;

public class SalarioService {
	@Autowired
	SalarioRepository salarioRepository;
	
	public Salario findById(Long id) {
		return salarioRepository.findById(id).orElseThrow(
				() -> new EntityNotFoundException("Id not found: " + id));
	}
}
