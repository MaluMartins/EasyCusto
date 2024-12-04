package com.easycusto.easycusto.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easycusto.easycusto.dtos.ReceitaDTO;
import com.easycusto.easycusto.dtos.TaxaCreateDTO;
import com.easycusto.easycusto.models.Receita;
import com.easycusto.easycusto.models.Taxa;
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
		double tempoPreparo = dto.horasPreparo() + (dto.minutosPreparo()/60);
		Receita receita = new Receita(dto.nome(), dto.rendimento(), dto.margemLucro(), dto.horasPreparo(), dto.minutosPreparo(), tempoPreparo);
		this.receitaRepository.save(receita);
		
		return ResponseEntity.ok(receita);
	}
	
	@GetMapping
	public ResponseEntity<List<Receita>> getAllRecipes() {
		List<Receita> receitas = receitaRepository.findAll();
	    
	    return ResponseEntity.ok(receitas);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<Receita> getOneRecipe(@PathVariable Long id) {
		Receita receita = receitaService.findById(id);
		return ResponseEntity.ok(receita);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<Object> updateRecipe(@PathVariable Long id, @RequestBody @Valid ReceitaDTO createDto) {
		Optional<Receita> receitaO = receitaRepository.findById(id);
		if (receitaO.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Receita não encontrada.");
		}
		
		Receita receita = receitaO.get();
		BeanUtils.copyProperties(createDto, receita);
		return ResponseEntity.status(HttpStatus.OK).body(receitaRepository.save(receita));
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<Object> deleteRecipe(@PathVariable Long id) {
		Optional<Receita> receitaO = receitaRepository.findById(id);
		
		if (receitaO.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Receita não encontrada.");
		}
		
		receitaRepository.delete(receitaO.get());
		
		return ResponseEntity.status(HttpStatus.OK).body("Receita deletada com sucesso.");
	}

}
