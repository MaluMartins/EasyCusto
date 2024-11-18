package com.easycusto.easycusto.controllers;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easycusto.easycusto.dtos.ReceitaDTO;
import com.easycusto.easycusto.models.Receita;
import com.easycusto.easycusto.repositories.IngredienteRepository;
import com.easycusto.easycusto.repositories.ReceitaRepository;
import com.easycusto.easycusto.services.IngredienteService;
import com.easycusto.easycusto.services.ReceitaService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("receitas")
public class ReceitaController {
	@Autowired
	IngredienteRepository ingredienteRepository;
	
	@Autowired
	IngredienteService ingredienteService;
	
	@Autowired
	ReceitaRepository receitaRepository;
	
	@Autowired
	ReceitaService receitaService;
	
	@PostMapping("/criarReceita")
	public ResponseEntity<Receita> createRecipe(@RequestBody @Valid ReceitaDTO dto) {
		Receita receita = new Receita(dto.nome(), dto.rendimento(), dto.margemLucro());
		this.receitaRepository.save(receita);
		
		return ResponseEntity.ok(receita);
	}
	
	@GetMapping
	public ResponseEntity<List<Receita>> getAllRecipes() {
		return ResponseEntity.ok(receitaRepository.findAll());
	}
	
	@GetMapping("{id}")
	public ResponseEntity<Receita> getOneRecipe(@PathVariable Long id) {
		Receita receita = receitaService.findById(id);
		return ResponseEntity.ok(receita);
	}

}
