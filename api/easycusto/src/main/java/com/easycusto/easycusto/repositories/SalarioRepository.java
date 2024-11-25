package com.easycusto.easycusto.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.easycusto.easycusto.models.Salario;

public interface SalarioRepository extends JpaRepository<Salario, Long> {
	Optional<Salario> findByUsuarioIdUsuario(Long idUsuario);
}
