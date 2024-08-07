package com.tiffin.repository;

import com.tiffin.entities.User;
import com.tiffin.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
//    @Query("SELECT u FROM User u WHERE u.role = :role")
//    List<User> findByRole(@Param("role") Role role);
	  List<User> findByRole(Role role);
}
