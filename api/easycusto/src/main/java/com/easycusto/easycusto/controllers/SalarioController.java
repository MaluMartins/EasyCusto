package com.easycusto.easycusto.controllers;

import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easycusto.easycusto.dtos.SalarioCreateDTO;
import com.easycusto.easycusto.models.Salario;
import com.easycusto.easycusto.repositories.SalarioRepository;
import com.easycusto.easycusto.services.SalarioService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("salario")
public class SalarioController {
	@Autowired
	SalarioRepository salarioRepository;
	
	@Autowired
	SalarioService salarioService;
	
	@PostMapping
	public ResponseEntity<Salario> createSalary(@RequestBody @Valid SalarioCreateDTO createDto) {
		Salario newSalario = new Salario(createDto.salarioMensal(), createDto.horasPorDia(), createDto.diasPorSemana());
		
		this.salarioRepository.save(newSalario);
		
		return ResponseEntity.ok(newSalario);
	}
	
	@GetMapping("{id}")
	public ResponseEntity<Salario> getSalary(@PathVariable Long id) {
		Salario taxa = salarioService.findById(id);
		
		return ResponseEntity.ok(taxa);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<Object> updateSalary(@PathVariable Long id, @RequestBody @Valid SalarioCreateDTO createDto) {
		Optional<Salario> salarioO = salarioRepository.findById(id);
		if (salarioO.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Salário não encontrado.");
		}
		
		Salario salario = salarioO.get();
		BeanUtils.copyProperties(createDto, salario);
		return ResponseEntity.status(HttpStatus.OK).body(salarioRepository.save(salario));
	}
}







