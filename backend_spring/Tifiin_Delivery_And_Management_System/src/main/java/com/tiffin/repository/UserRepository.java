package com.tiffin.repository;

import com.tiffin.entities.Order;
import com.tiffin.entities.User;
import com.tiffin.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
//    @Query("SELECT u FROM User u WHERE u.role = :role")
//    List<User> findByRole(@Param("role") Role role);
	List<User> findByRole(Role role);

	@Query("SELECT u FROM User u LEFT JOIN FETCH u.addresses WHERE u.role = :role")
	List<User> findByRoleWithAddresses(@Param("role") Role role);

}
