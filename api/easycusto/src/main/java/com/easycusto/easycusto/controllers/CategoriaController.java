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

import com.easycusto.easycusto.dtos.CategoriaCreateDTO;
import com.easycusto.easycusto.models.Categoria;
import com.easycusto.easycusto.repositories.CategoriaRepository;
import com.easycusto.easycusto.services.CategoriaService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("categorias")
public class CategoriaController {
	@Autowired
	CategoriaRepository categoriaRepository;
	
	@Autowired
	CategoriaService categoriaService;
	
	@PostMapping
	public ResponseEntity<Categoria> createCategory(@RequestBody @Valid CategoriaCreateDTO createDto) {
		Categoria newCategoria = new Categoria(createDto.nome());
		
		this.categoriaRepository.save(newCategoria);
		
		return ResponseEntity.ok(newCategoria);
	}
	
	@GetMapping
	public ResponseEntity<List<Categoria>> getAllCategories() {
		return ResponseEntity.ok(categoriaRepository.findAll());
	}
	
	@GetMapping("{id}")
	public ResponseEntity<Categoria> getOneCategory(@PathVariable Long id) {
		Categoria categoria = categoriaService.findById(id);
		
		return ResponseEntity.ok(categoria);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<Object> updateCategory(@PathVariable Long id, @RequestBody @Valid CategoriaCreateDTO createDto) {
		Optional<Categoria> categoriaO = categoriaRepository.findById(id);
		if (categoriaO.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoria não encontrada.");
		}
		
		Categoria categoria = categoriaO.get();
		BeanUtils.copyProperties(createDto, categoria);
		return ResponseEntity.status(HttpStatus.OK).body(categoriaRepository.save(categoria));
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<Object> deleteCategory(@PathVariable(value = "id") Long id) {
		Optional<Categoria> categoriaO = categoriaRepository.findById(id);
		
		if (categoriaO.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Categoria não encontrada.");
		}
		
		categoriaRepository.delete(categoriaO.get());
		
		return ResponseEntity.status(HttpStatus.OK).body("Categoria deletada com sucesso.");
	}
}
