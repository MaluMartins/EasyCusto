package com.easycusto.easycusto.controllers;

import java.math.BigDecimal;
import java.math.RoundingMode;
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
import com.easycusto.easycusto.models.Usuario;
import com.easycusto.easycusto.repositories.SalarioRepository;
import com.easycusto.easycusto.services.SalarioService;
import com.easycusto.easycusto.services.UsuarioService;
import com.easycusto.easycusto.utils.UserUtil;

import jakarta.validation.Valid;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("salario")
public class SalarioController {
	@Autowired
	SalarioRepository salarioRepository;
	
	@Autowired
	SalarioService salarioService;
	
	@Autowired
	UsuarioService usuarioService;
	
	@PostMapping
	public ResponseEntity<Salario> createSalary(@RequestBody @Valid SalarioCreateDTO createDto) {
		String username = UserUtil.getCurrentUsername();
        Usuario usuario = usuarioService.buscarPorUsername(username);

		Salario newSalario = new Salario(createDto.salarioMensal(), createDto.horasPorDia(), createDto.diasPorSemana(), usuario);
		
		this.salarioRepository.save(newSalario);
		
		return ResponseEntity.ok(newSalario);
	}
	
	@GetMapping
	public ResponseEntity<Salario> getSalary() {
		Salario salario = salarioService.buscarSalarioAtual();
		
	    if (salario == null) {
	        return ResponseEntity.noContent().build();
	    }
	    
	    return ResponseEntity.ok(salario);
	}
	
	@PutMapping("{id}")
	public ResponseEntity<Object> updateSalary(@PathVariable Long id, @RequestBody @Valid SalarioCreateDTO createDto) {
		Optional<Salario> salarioO = salarioRepository.findById(id);
		if (salarioO.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Salário não encontrado.");
		}
		
		Salario salario = salarioO.get();
		//BeanUtils.copyProperties(createDto, salario);
		
		if (createDto.salarioMensal() != 0) {
			salario.setSalarioMensal(createDto.salarioMensal());
		}
		if (createDto.horasPorDia() != 0) {
			salario.setHorasPorDia(createDto.horasPorDia());
		}
		if (createDto.diasPorSemana() != 0) {
			salario.setDiasPorSemana(createDto.diasPorSemana());
		}
		
		double salarioPorHora = salario.getSalarioMensal() / ((salario.getDiasPorSemana() * salario.getHorasPorDia()) * 4.3);
		
		salarioPorHora = new BigDecimal(salarioPorHora)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
		
		salario.setSalarioPorHora(salarioPorHora);
		
		return ResponseEntity.status(HttpStatus.OK).body(salarioRepository.save(salario));
	}
}







