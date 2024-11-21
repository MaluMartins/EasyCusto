package com.easycusto.easycusto.controllers;

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

import com.easycusto.easycusto.dtos.TaxaCreateDTO;
import com.easycusto.easycusto.models.Taxa;
import com.easycusto.easycusto.repositories.TaxaRepository;
import com.easycusto.easycusto.services.TaxaService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("taxas")
public class TaxaController {
	@Autowired
	TaxaRepository taxaRepository;
	
	@Autowired
	TaxaService taxaService;
	
	@PostMapping
	public ResponseEntity<Taxa> createTax(@RequestBody @Valid TaxaCreateDTO createDto) {
		Taxa newTaxa = new Taxa(createDto.nome(), createDto.percentual());
		
		this.taxaRepository.save(newTaxa);
		
		return ResponseEntity.ok(newTaxa);
	}
	
	@GetMapping
	public ResponseEntity<List<Taxa>> getAllTaxes() {
		return ResponseEntity.ok(taxaRepository.findAll());
	}
	
	@GetMapping("{id}")
	public ResponseEntity<Taxa> getOneTax(@PathVariable Long id) {
		Taxa taxa = taxaService.findById(id);
		
		return ResponseEntity.ok(taxa);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<Object> updateTax(@PathVariable Long id, @RequestBody @Valid TaxaCreateDTO createDto) {
		Optional<Taxa> taxaO = taxaRepository.findById(id);
		if (taxaO.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Taxa não encontrada.");
		}
		
		Taxa taxa = taxaO.get();
		BeanUtils.copyProperties(createDto, taxa);
		return ResponseEntity.status(HttpStatus.OK).body(taxaRepository.save(taxa));
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<Object> deleteTax(@PathVariable(value = "id") Long id) {
		Optional<Taxa> taxaO = taxaRepository.findById(id);
		
		if (taxaO.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Taxa não encontrada.");
		}
		
		taxaRepository.delete(taxaO.get());
		
		return ResponseEntity.status(HttpStatus.OK).body("Taxa deletada com sucesso.");
	}
}










