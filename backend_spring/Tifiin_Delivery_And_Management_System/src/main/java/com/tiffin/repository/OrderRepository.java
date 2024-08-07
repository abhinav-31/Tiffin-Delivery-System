package com.tiffin.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.tiffin.entities.Order;
import com.tiffin.entities.OrderDetails;
import com.tiffin.entities.User;
import com.tiffin.enums.OrderStatus;

public interface OrderRepository extends JpaRepository<Order, Long> {

	@Query("select o from Order o where o.id=:orderId and o.status=:delivered")
	Optional<Order> findOrderByIdAndStatus(Long orderId, OrderStatus delivered);

	List<Order> findByVendor(User vendor);
//	@Query("SELECT o FROM Order o JOIN FETCH o.customer c JOIN FETCH c.addresses WHERE o.vendor = :vendor")
//	List<Order> findByVendor(@Param("vendor") User vendor);

//	@Query("SELECT o FROM Order o " + "JOIN FETCH o.customer " + "JOIN FETCH o.vendor " + "JOIN FETCH o.deliveryBoy "
//			+ "JOIN FETCH o.deliveryAddress " + "WHERE o.vendor.id = :vendorId AND o.status = :status")
//	List<Order> findByVendorAndStatusWithFetch(@Param("vendorId") Long vendorId, @Param("status") OrderStatus status);
	@Query("SELECT o FROM Order o " + "JOIN FETCH o.customer " + "JOIN FETCH o.vendor "
			+ "LEFT JOIN FETCH o.deliveryBoy " + "LEFT JOIN FETCH o.deliveryAddress " + "WHERE o.vendor = :vendor")
	List<Order> findByVendorWithFetch(@Param("vendor") User vendor);
}
