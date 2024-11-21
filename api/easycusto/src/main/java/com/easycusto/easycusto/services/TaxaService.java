package com.easycusto.easycusto.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easycusto.easycusto.exceptions.EntityNotFoundException;
import com.easycusto.easycusto.models.Taxa;
import com.easycusto.easycusto.repositories.TaxaRepository;

@Service
public class TaxaService {
	@Autowired
	TaxaRepository taxaRepository;
	
	public Taxa findById(Long id) {
		return taxaRepository.findById(id).orElseThrow(
				() -> new EntityNotFoundException("Id not found: " + id));
	}
}
