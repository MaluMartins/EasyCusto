package com.easycusto.easycusto.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easycusto.easycusto.exceptions.EntityNotFoundException;
import com.easycusto.easycusto.models.Ingrediente;
import com.easycusto.easycusto.repositories.IngredienteRepository;

@Service
public class IngredienteService {
	@Autowired
	IngredienteRepository ingredienteRepository;
	
	public Ingrediente findById(Long id) {
		return ingredienteRepository.findById(id).orElseThrow(
				() -> new EntityNotFoundException("Id not found: " + id));
	}
}
