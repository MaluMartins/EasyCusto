package com.easycusto.easycusto.models;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "receita_ingrediente")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class ReceitaIngrediente {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "receita_id")
    @JsonIgnore
    private Receita receita;

    @ManyToOne
    @JoinColumn(name = "ingrediente_id")
    //@JsonIgnore
    private Ingrediente ingrediente;

    @Column(name = "qt_usada")
    private double qtUsada;

    @Column(name = "custo_ingrediente")
    private double custoIngrediente;

    public ReceitaIngrediente(Receita receita, Ingrediente ingrediente, double qtUsada) {
        this.receita = receita;
        this.ingrediente = ingrediente;
        this.qtUsada = qtUsada;
        this.custoIngrediente = (ingrediente.getPrecoPorEmbalagem() * qtUsada) / ingrediente.getQtPorEmbalagem();
    }
}
