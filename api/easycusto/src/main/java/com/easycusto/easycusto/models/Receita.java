package com.easycusto.easycusto.models;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "receita")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Receita {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_receita")
	private Long id_receita;
	
	@Column(name = "nome")
	private String nome;
	
	@Column(name = "rendimento")
	private int rendimento;
	
	@Column(name = "margem_lucro")
	private BigDecimal margemLucro;
	
	@Column(name = "data_inclusao")
	private LocalDate dataInclusao;
	
	@Column(name = "horas_producao")
	private double horasProducao;
	
	@OneToMany(mappedBy = "receita", cascade = CascadeType.ALL, orphanRemoval = true) 
    private Set<ReceitaIngrediente> receitaIngredientes = new HashSet<>();
	
	@ManyToMany(mappedBy = "receitas", cascade = CascadeType.ALL)
	private Set<Taxa> taxas = new HashSet<>();
	
	public Receita(String nome, int rendimento, BigDecimal custoEmbalagem, BigDecimal margemLucro) {
		this.nome = nome;
		this.rendimento = rendimento;
		this.margemLucro = margemLucro;
		this.dataInclusao = LocalDate.now();
	}

}
