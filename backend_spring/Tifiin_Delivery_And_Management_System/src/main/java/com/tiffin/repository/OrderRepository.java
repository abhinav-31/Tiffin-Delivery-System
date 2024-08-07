package com.tiffin.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.tiffin.entities.Order;
import com.tiffin.entities.OrderDetails;
import com.tiffin.entities.User;
import com.tiffin.enums.OrderStatus;

public interface OrderRepository extends JpaRepository<Order, Long> {
	List<Order> findByVendor(User vendor);

	@Query("select o from Order o where o.id=:orderId and o.status=:delivered")
	Optional<Order> findOrderByIdAndStatus(Long orderId, OrderStatus delivered);
}
