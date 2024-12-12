package com.easycusto.easycusto.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.easycusto.easycusto.models.Ingrediente;

public interface IngredienteRepository extends JpaRepository<Ingrediente, Long> {
	//barra de pesquisa do ingrediente
	@Query("SELECT i FROM Ingrediente i WHERE LOWER(i.nome) LIKE LOWER(CONCAT('%', :termo, '%'))")
	List<Ingrediente> buscarPorNome(@Param("termo") String termo);
}
