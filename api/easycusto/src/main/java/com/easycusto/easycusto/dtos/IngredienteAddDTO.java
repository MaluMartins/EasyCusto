package com.easycusto.easycusto.dtos;

//cria ingrediente para adicionar em receita
public record IngredienteAddDTO(String nome, double precoPorEmbalagem, double qtPorEmbalagem, double qtUsada, String unidadeMedida) {

}
