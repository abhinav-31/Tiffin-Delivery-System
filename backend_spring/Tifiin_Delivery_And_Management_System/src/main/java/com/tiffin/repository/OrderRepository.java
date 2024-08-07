package com.tiffin.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.tiffin.entities.Order;
import com.tiffin.entities.User;
import com.tiffin.enums.OrderStatus;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
	 List<Order> findByVendor(User vendor);
	@Query("SELECT o FROM Order o WHERE o.id = :orderId AND o.status = :status")
	Optional<Order> findOrderByIdAndStatus(Long orderId, OrderStatus status);

}
