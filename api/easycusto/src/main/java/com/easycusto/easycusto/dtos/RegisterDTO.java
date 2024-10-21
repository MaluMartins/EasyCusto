package com.easycusto.easycusto.dtos;

import com.easycusto.easycusto.models.Usuario.Role;

public record RegisterDTO(String username, String senha, Role role) {}
