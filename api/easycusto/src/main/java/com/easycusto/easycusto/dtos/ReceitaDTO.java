package com.easycusto.easycusto.dtos;

import java.math.BigDecimal;
import java.time.LocalDate;

public record ReceitaDTO(String nome, int rendimento, BigDecimal custoEmbalagem, BigDecimal margemLucro) {

}