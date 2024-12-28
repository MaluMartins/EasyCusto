package com.easycusto.easycusto.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.easycusto.easycusto.dtos.IngredienteAddDTO;
import com.easycusto.easycusto.dtos.IngredienteCreateDTO;
import com.easycusto.easycusto.dtos.IngredienteIdDTO;
import com.easycusto.easycusto.dtos.ReceitaDTO;
import com.easycusto.easycusto.models.Ingrediente;
import com.easycusto.easycusto.models.Receita;
import com.easycusto.easycusto.models.ReceitaIngrediente;
import com.easycusto.easycusto.models.Taxa;
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
		Ingrediente novoIngrediente = new Ingrediente(dto.nome(), dto.precoPorEmbalagem(), dto.qtPorEmbalagem(), dto.unidadeMedida());
		this.ingredienteRepository.save(novoIngrediente);
		
		return ResponseEntity.ok(novoIngrediente);
	}
	
	//criar novo ingrediente e adicionar em uma receita (não usado por enquanto)
	@PostMapping("criarIngredienteEmReceita/{id_receita}")
	public ResponseEntity<Ingrediente> createRecipeIngredient(@RequestBody @Valid IngredienteAddDTO dto, @PathVariable Long id_receita) {
		Ingrediente novoIngrediente = new Ingrediente(dto.nome(), dto.precoPorEmbalagem(), dto.qtPorEmbalagem(), dto.unidadeMedida());
		this.ingredienteRepository.save(novoIngrediente);
		
		double precoPorEmbalagem = novoIngrediente.getPrecoPorEmbalagem();
		double qtUsada = dto.qtUsada();
		double qtPorEmbalagem = novoIngrediente.getQtPorEmbalagem();
		
		double custoIngrediente = (precoPorEmbalagem * qtUsada)/qtPorEmbalagem;
		
		Receita receita = this.receitaService.findById(id_receita);
		
		ReceitaIngrediente receitaIngrediente = new ReceitaIngrediente();
	    receitaIngrediente.setIngrediente(novoIngrediente);
	    receitaIngrediente.setReceita(receita);
	    receitaIngrediente.setQtUsada(qtUsada);
	    receitaIngrediente.setCustoIngrediente(custoIngrediente);
	    
	    this.receitaIngredienteRepository.save(receitaIngrediente);
	    
	    receita.getReceitaIngredientes().add(receitaIngrediente);
	    
	    this.receitaRepository.save(receita);
	    
	    return ResponseEntity.ok(novoIngrediente);
	}
	
	//pegar ingredientes existentes e adicionar em uma receita existente
	@PostMapping("adicionarIngredienteEmReceita/{id_receita}")
	public ResponseEntity<Receita> assignIngredientToRecipe(@PathVariable Long id_receita, @RequestBody IngredienteIdDTO ingredienteRequest) {
		Ingrediente ingrediente = this.ingredienteService.findById(ingredienteRequest.id());
		
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
	    
	    receita.getReceitaIngredientes().add(receitaIngrediente);
	    
	    //receita.calcularCustosFinais();
	    
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
	
	@GetMapping("/pesquisa")
    public ResponseEntity<List<Ingrediente>> pesquisar(@RequestParam String termo) {
        List<Ingrediente> ingredientes = ingredienteService.buscarIngredientes(termo);
        return ResponseEntity.ok(ingredientes);
    }
	
	@DeleteMapping("{id}")
	public ResponseEntity<Object> deleteIngredient(@PathVariable Long id) {
		Optional<Ingrediente> ingredienteO = ingredienteRepository.findById(id);
		
		if (ingredienteO.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ingrediente não encontrado.");
		}
		
		ingredienteRepository.delete(ingredienteO.get());
		
		return ResponseEntity.status(HttpStatus.OK).body("Ingrediente deletado com sucesso.");
	}
	
	@PutMapping("{id}")
	public ResponseEntity<Object> updateIngredient(@PathVariable Long id, @RequestBody @Valid IngredienteCreateDTO createDto) {
		Optional<Ingrediente> ingredienteO = ingredienteRepository.findById(id);
		if (ingredienteO.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Ingrediente não encontrado.");
		}
		
		Ingrediente ingrediente = ingredienteO.get();
		ingrediente.setNome(createDto.nome());
		ingrediente.setPrecoPorEmbalagem(createDto.precoPorEmbalagem());
		ingrediente.setQtPorEmbalagem(createDto.qtPorEmbalagem());
		
		double custoPorUnidade = createDto.precoPorEmbalagem() / createDto.qtPorEmbalagem();
		
		ingrediente.setCustoPorUnidade(custoPorUnidade);

		return ResponseEntity.status(HttpStatus.OK).body(ingredienteRepository.save(ingrediente));
	}
	
	//remover ingrediente da receita
}







