package com.tiffin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tiffin.entities.DeliveryBoy;
import java.util.List;
import com.tiffin.entities.User;
import com.tiffin.enums.DeliveryStatus;


@Repository
public interface DeliveryBoyRepository extends JpaRepository<DeliveryBoy, Long> {
	
	Optional<DeliveryBoy> findByDeliveryBoy(User deliveryBoy);
	List<DeliveryBoy> findByStatus(DeliveryStatus status);
}
