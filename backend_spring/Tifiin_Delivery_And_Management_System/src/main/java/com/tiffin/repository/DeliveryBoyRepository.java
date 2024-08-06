package com.tiffin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tiffin.entities.DeliveryBoy;
import java.util.List;
import com.tiffin.entities.User;


public interface DeliveryBoyRepository extends JpaRepository<DeliveryBoy, Long> {
	
	Optional<DeliveryBoy> findByDeliveryBoy(User deliveryBoy);
}
