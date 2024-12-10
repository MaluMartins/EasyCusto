package com.easycusto.easycusto.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.easycusto.easycusto.models.Receita;
import com.easycusto.easycusto.repositories.ReceitaRepository;
import com.easycusto.easycusto.exceptions.EntityNotFoundException;

@Service
public class ReceitaService {
	
	@Autowired
	ReceitaRepository receitaRepository;
	
	public Receita findById(Long id) {
		return receitaRepository.findById(id).orElseThrow(
				() -> new EntityNotFoundException("Id not found: " + id));
	}
	
	public List<Receita> buscarReceitas(String termo) {
        return receitaRepository.buscarPorNome(termo);
    }


}
