package org.example.travelguide.dao;

import org.example.travelguide.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleDao extends JpaRepository<Role,Long> {
    Optional<Role> findByRoleName(String roleName);
}
