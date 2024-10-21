package com.easycusto.easycusto.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.easycusto.easycusto.dtos.IngredienteAddDTO;
import com.easycusto.easycusto.dtos.IngredienteCreateDTO;
import com.easycusto.easycusto.dtos.IngredienteIdDTO;
import com.easycusto.easycusto.models.Ingrediente;
import com.easycusto.easycusto.models.Receita;
import com.easycusto.easycusto.models.ReceitaIngrediente;
import com.easycusto.easycusto.repositories.IngredienteRepository;
import com.easycusto.easycusto.repositories.ReceitaIngredienteRepository;
import com.easycusto.easycusto.repositories.ReceitaRepository;
import com.easycusto.easycusto.services.IngredienteService;
import com.easycusto.easycusto.services.ReceitaService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("ingredientes")
public class IngredienteController {
	@Autowired
	IngredienteRepository ingredienteRepository;
	
	@Autowired
	IngredienteService ingredienteService;
	
	@Autowired
	ReceitaRepository receitaRepository;
	
	@Autowired
	ReceitaService receitaService;
	
	@Autowired
	ReceitaIngredienteRepository receitaIngredienteRepository;
	
	//criar novo ingrediente
	@PostMapping("/criarIngrediente")
	public ResponseEntity<Ingrediente> createIngredient(@RequestBody @Valid IngredienteCreateDTO dto) {
		Ingrediente novoIngrediente = new Ingrediente(dto.nome(), dto.precoPorEmbalagem(), dto.qtPorEmbalagem());
		this.ingredienteRepository.save(novoIngrediente);
		
		return ResponseEntity.ok(novoIngrediente);
	}
	
	//criar novo ingrediente e adicionar em uma receita
	/*@PostMapping("criarIngredienteEmReceita/{id_receita}")
	public ResponseEntity<Ingrediente> createRecipeIngredient(@RequestBody @Valid IngredienteAddDTO dto, @PathVariable Long id_receita) {
		Ingrediente novoIngrediente = new Ingrediente(dto.nome(), dto.precoPorEmbalagem(), dto.qtPorEmbalagem(), dto.qtUsada());
		this.ingredienteRepository.save(novoIngrediente);
		
		Receita receita = this.receitaService.findById(id_receita);
		
		Set<Ingrediente> ingredientes = new HashSet<>();
		ingredientes.add(novoIngrediente);
		
		receita.setIngredientes(ingredientes);
		this.receitaRepository.save(receita);
		
		return ResponseEntity.ok(null);
	}*/
	
	//pegar ingredientes existentes e adicionar em uma receita existente
	@PostMapping("adicionarIngredienteEmReceita/{id_receita}")
	public ResponseEntity<Receita> assignIngredientToRecipe(@PathVariable Long id_receita, @RequestBody IngredienteIdDTO ingredienteRequest) {
		Ingrediente ingrediente = this.ingredienteService.findById(ingredienteRequest.id());
		//ingrediente.setQtUsada(ingredienteRequest.qtUsada());
		
		double precoPorEmbalagem = ingrediente.getPrecoPorEmbalagem();
		double qtUsada = ingredienteRequest.qtUsada();
		double qtPorEmbalagem = ingrediente.getQtPorEmbalagem();
		
		double custoIngrediente = (precoPorEmbalagem * qtUsada)/qtPorEmbalagem;
		
		Receita receita = this.receitaService.findById(id_receita);
		
		ReceitaIngrediente receitaIngrediente = new ReceitaIngrediente();
	    receitaIngrediente.setIngrediente(ingrediente);
	    receitaIngrediente.setReceita(receita);
	    receitaIngrediente.setQtUsada(qtUsada);
	    receitaIngrediente.setCustoIngrediente(custoIngrediente);
	    
	    this.receitaIngredienteRepository.save(receitaIngrediente);
	    
	    // Adicionar o novo ReceitaIngrediente na receita
	    receita.getReceitaIngredientes().add(receitaIngrediente);
	    
	    // Atualizar e salvar a receita
	    this.receitaRepository.save(receita);
	    
	    return ResponseEntity.ok(receita);
		
	}
	
	@GetMapping
	public ResponseEntity<List<Ingrediente>> getAllIngredients() {
		return ResponseEntity.ok(ingredienteRepository.findAll());
	}
	
	@GetMapping("{id}")
	public ResponseEntity<Ingrediente> getIngredientById(@PathVariable Long id) {
		Ingrediente ingrediente = ingredienteService.findById(id);
		
		return ResponseEntity.ok(ingrediente);
	}
}







