package com.easycusto.easycusto.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;

import com.easycusto.easycusto.models.Usuario;

public interface UserDetailsRepository extends JpaRepository<Usuario, Long>{
	UserDetails findByUsername(String username);
}
