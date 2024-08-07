package com.tiffin.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tiffin.dto.OrderRequestDTO;
import com.tiffin.dto.OrderResDTO;
import com.tiffin.enums.OrderStatus;
import com.tiffin.service.OrderService;
import jakarta.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/orders")
public class OrderController {

	@Autowired
	private OrderService orderService;

	@PostMapping("/{customerId}/{vendorId}")
	public ResponseEntity<?> addOrder(@RequestBody @Valid OrderRequestDTO orderRequest, @PathVariable Long customerId,
			@PathVariable Long vendorId) {
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(orderService.addOrder(orderRequest, customerId, vendorId));
	}

	@GetMapping("/{vendorId}")
	public ResponseEntity<?> getOrdersByStatus(@RequestParam OrderStatus status, @PathVariable Long vendorId) {
		return ResponseEntity.status(HttpStatus.OK).body(orderService.getOrdersByVendorAndStatus(vendorId, status));
	}
}
