package com.easycusto.easycusto.models;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "taxa")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Taxa {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_taxa")
	private Long id_taxa;
	
	@Column(name = "nome")
	private String nome;
	
	@Column(name = "percentual")
	private double percentual;
	
	@ManyToMany
	@JoinTable(
		name = "taxa_receita", 
		joinColumns = @JoinColumn(name = "id_taxa"), 
		inverseJoinColumns = @JoinColumn(name = "id_receita")
	)
	private Set<Receita> receitas = new HashSet<>();
	
	public Taxa(String nome, double percentual) {
		this.nome = nome;
		this.percentual = percentual;
	}
}











