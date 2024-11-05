package com.tiffin.repository;

import com.tiffin.entities.Order;
import com.tiffin.entities.User;
import com.tiffin.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	List<User> findByRole(Role role);

	Optional<User> findByEmail(String email);

	@Query("select u from User u where u.role = :role")
	List<User> findAllVendors(Role role);

	@Query("SELECT u FROM User u LEFT JOIN FETCH u.addresses WHERE u.role = :role")
	List<User> findByRoleWithAddresses(@Param("role") Role role);

	boolean existsByEmail(String email);
}
