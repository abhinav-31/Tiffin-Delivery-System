package com.tiffin.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tiffin.entities.OrderDetails;
import com.tiffin.entities.User;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {
}