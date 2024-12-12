package com.easycusto.easycusto.models;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashSet;
import java.util.Set;

import org.hibernate.annotations.Formula;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "ingrediente")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Ingrediente {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_ingrediente")
	private Long id_ingrediente;
	
	@Column(name = "nome")
	private String nome;
	
	@Column(name = "preco_por_embalagem")
	private double precoPorEmbalagem;
	
	@Column(name = "qt_por_embalagem")
	private double qtPorEmbalagem;
	
	@Column(name = "custo_por_unidade")
	private double custoPorUnidade;
	
	@Column(name = "unidade_medida")
	private String unidadeMedida;
	
	@OneToMany(mappedBy = "ingrediente", cascade = CascadeType.ALL, orphanRemoval = true) 
	@JsonIgnore
    private Set<ReceitaIngrediente> receitaIngredientes = new HashSet<>();
	
	public Ingrediente(String nome, double precoPorEmbalagem, double qtPorEmbalagem, String unidadeMedida) {
        this.nome = nome;
        this.precoPorEmbalagem = precoPorEmbalagem;
        this.qtPorEmbalagem = qtPorEmbalagem;
        this.unidadeMedida = unidadeMedida;
        this.custoPorUnidade = BigDecimal.valueOf(precoPorEmbalagem / qtPorEmbalagem)
                .setScale(3, RoundingMode.HALF_UP)
                .doubleValue();
    }
}
