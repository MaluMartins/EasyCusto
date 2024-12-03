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
import jakarta.persistence.ManyToOne;
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
	private double margemLucro;
	
	@Column(name = "data_inclusao")
	private LocalDate dataInclusao;
	
	@Column(name = "tempo_producao")
	private double tempoProducao;
	
	@OneToMany(mappedBy = "receita", cascade = CascadeType.ALL, orphanRemoval = true) 
    private Set<ReceitaIngrediente> receitaIngredientes = new HashSet<>();
	
	@ManyToMany(mappedBy = "receitas", cascade = CascadeType.ALL)
	private Set<Taxa> taxas = new HashSet<>();
	
	@ManyToOne
    @JoinColumn(name = "salario_id")
    private Salario salario;
	
	@ManyToOne
    @JoinColumn(name = "categoria_id")
    private Categoria categoria;
	
	//calculos finais
	@Column(name = "custo_total")
	private double custoTotal;
	
	@Column(name = "custo_por_unidade")
	private double custoPorUnidade;
	
	@Column(name = "preco_total")
	private double precoTotal;
	
	@Column(name = "preco_por_unidade")
	private double precoPorUnidade;
	
	@Column(name = "lucro_total")
	private double lucroTotal;
	
	@Column(name = "lucro_por_unidade")
	private double lucroPorUnidade;
	
	public Receita(String nome, int rendimento, double margemLucro, double tempoProducao) {
		this.nome = nome;
		this.rendimento = rendimento;
		this.margemLucro = margemLucro;
		this.dataInclusao = LocalDate.now();
		this.tempoProducao = tempoProducao;
	}
	
	public void calcularCustosFinais() {
		double custoTotalIngredientes = 0;
		double totalTaxas = 0;
		double maoDeObra = this.salario.getSalarioPorHora() * this.tempoProducao;
		double margemLucroReal = 1 + this.margemLucro/100;
		
		for (ReceitaIngrediente ingrediente : this.receitaIngredientes) {
			custoTotalIngredientes += ingrediente.getCustoIngrediente();
		}
		
		for (Taxa taxa : taxas) {
			totalTaxas += taxa.getPercentual();
		}
		
		double taxaReal = 1 + totalTaxas/100;
		
		this.custoTotal = (custoTotalIngredientes + maoDeObra) * taxaReal;
		this.custoPorUnidade = this.custoTotal / this.rendimento;
		
		this.precoPorUnidade = this.custoPorUnidade * margemLucroReal;
		this.precoTotal = this.precoPorUnidade * rendimento;
		
		this.lucroPorUnidade = this.precoPorUnidade - this.custoPorUnidade;
		this.lucroTotal = this.precoTotal - this.custoTotal;
 	}

}
