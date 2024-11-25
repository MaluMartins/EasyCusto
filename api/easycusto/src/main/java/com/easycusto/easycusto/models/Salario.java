package com.easycusto.easycusto.models;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;

import com.easycusto.easycusto.services.UsuarioService;
import com.easycusto.easycusto.utils.UserUtil;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "salario")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Salario {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_salario")
	private Long id_salario;
	
	@Column(name = "salario_mensal")
	private double salarioMensal;
	
	@Column(name = "horas_por_dia")
	private double horasPorDia;
	
	@Column(name = "dias_por_semana")
	private double diasPorSemana;
	
	@Column(name = "salario_por_hora")
	private double salarioPorHora;
	
	@OneToMany(mappedBy = "salario", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Receita> receitas = new HashSet<>();
	
	@OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "idUsuario", referencedColumnName = "id_usuario")
	@JsonIgnore
    private Usuario usuario;
	
	public Salario(double salarioMensal, double horasPorDia, double diasPorSemana, Usuario usuario) {
		this.salarioMensal = salarioMensal;
		this.horasPorDia = horasPorDia;
		this.diasPorSemana = diasPorSemana;
		
		double salarioPorHoraCalculado = salarioMensal / ((horasPorDia * diasPorSemana) * 4.3);
		this.salarioPorHora = new BigDecimal(salarioPorHoraCalculado)
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();
		
		this.usuario = usuario;
	}
}






