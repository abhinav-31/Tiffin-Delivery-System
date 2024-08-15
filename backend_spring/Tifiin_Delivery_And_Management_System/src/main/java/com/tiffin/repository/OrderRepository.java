package com.tiffin.repository;

import java.util.List;
import java.util.Optional;

import com.tiffin.entities.DeliveryBoy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.tiffin.entities.Order;
import com.tiffin.entities.User;
import com.tiffin.enums.OrderStatus;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
	List<Order> findByVendor(User vendor);

	@Query("SELECT o FROM Order o WHERE o.id = :orderId AND o.status = :status")
	Optional<Order> findOrderByIdAndStatus(Long orderId, OrderStatus status);

	@Query("SELECT o FROM Order o JOIN FETCH o.customer JOIN FETCH o.vendor LEFT JOIN FETCH o.deliveryBoy LEFT JOIN FETCH o.deliveryAddress WHERE o.vendor = :vendor")
	List<Order> findByVendorWithFetch(@Param("vendor") User vendor);

	List<Order> findByVendorAndStatus(User vendor, OrderStatus status);

	List<Order> findByDeliveryBoy(DeliveryBoy deliveryDetails);
	
	@Query("SELECT o FROM Order o where o.customer=:u and o.status=:delivered")
	List<Order> findAllDeliveredOrder(User u, OrderStatus delivered);
}
