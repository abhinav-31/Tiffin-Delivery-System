package com.tiffin.repository;

import java.util.List;
import java.util.Optional;

import com.tiffin.entities.Order;
import org.aspectj.weaver.ast.Or;
import org.springframework.data.jpa.repository.JpaRepository;

import com.tiffin.entities.OrderDetails;
import com.tiffin.entities.User;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Long> {
  List<OrderDetails> findByOrder(Order order);
}
