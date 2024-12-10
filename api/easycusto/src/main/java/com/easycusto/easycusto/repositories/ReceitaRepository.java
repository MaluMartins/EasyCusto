package com.easycusto.easycusto.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.easycusto.easycusto.models.Receita;

public interface ReceitaRepository extends JpaRepository<Receita, Long>{
	
	//barra de pesquisa da receita
	@Query("SELECT r FROM Receita r WHERE LOWER(r.nome) LIKE LOWER(CONCAT('%', :termo, '%'))")
    List<Receita> buscarPorNome(@Param("termo") String termo);
}
