package com.easycusto.easycusto.dtos;

import com.easycusto.easycusto.models.Ingrediente;
import com.easycusto.easycusto.models.Receita;

public record ReceitaResponseDTO(Receita receita, Ingrediente ingrediente) {
	public ReceitaResponseDTO(Receita receita, Ingrediente ingrediente) {
		this.receita = receita;
		this.ingrediente = ingrediente;
	}
}
