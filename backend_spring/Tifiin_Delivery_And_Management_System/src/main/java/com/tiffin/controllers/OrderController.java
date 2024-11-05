package com.tiffin.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tiffin.dto.OrderRequestDTO;
import com.tiffin.dto.ReviewReqDTO;
import com.tiffin.enums.OrderStatus;
import com.tiffin.service.FindDistanceService;
import com.tiffin.service.OrderService;
import com.tiffin.service.ReviewService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/orders")
public class OrderController {

	@Autowired
	private OrderService orderService;
	@Autowired
	private ReviewService reviewService;
	@Autowired
	private FindDistanceService findDistanceService;

//	@RequestMapping(method = RequestMethod.POST)
	@PostMapping("/addOrder/{vendorId}")
	public ResponseEntity<?> addOrder(@RequestBody @Valid OrderRequestDTO orderRequest, @PathVariable Long vendorId) {
		return ResponseEntity.status(HttpStatus.CREATED).body(orderService.addOrder(orderRequest, vendorId));
	}

	// Adding Review for order by customer
	@PostMapping("/addReview/{orderId}")
	public ResponseEntity<?> addReviewByCustomer(@PathVariable Long orderId, @RequestBody ReviewReqDTO review) {
		return ResponseEntity.status(HttpStatus.CREATED).body(reviewService.addReview(orderId, review));
	}

	@GetMapping("/{vendorId}")
	public ResponseEntity<?> getOrdersByStatus(@RequestParam OrderStatus status, @PathVariable Long vendorId) {
		return ResponseEntity.status(HttpStatus.OK).body(orderService.getOrdersByVendorAndStatus(vendorId, status));
	}

	@PutMapping("/changeStatus/{orderId}")
	public ResponseEntity<?> changeOrderStatus(@PathVariable Long orderId) {
		System.out.println("Hello order status");
		return ResponseEntity.status(HttpStatus.OK).body(orderService.changeStatus(orderId));
	}

	@GetMapping("/deliveryBoy")
	public ResponseEntity<?> getOrderForDeliveryBoy(@RequestParam OrderStatus status) {
		System.out.println("order placed 2");
		return ResponseEntity.status(HttpStatus.OK).body(orderService.getPlacedForDelivery(status));
	}

	@GetMapping("/deliveryCharges/{customerPincode}/{vendorPincode}")
	public ResponseEntity<?> getDeliveryCharges(@RequestParam String customerPincode,
			@RequestParam String vendorPincode) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(findDistanceService.deliveryDistanceBetweenVendorAndCust(customerPincode, vendorPincode));
	}

	@GetMapping("/customerOrderHistory")
	ResponseEntity<?> getCustomerOrderHistory() {
		return ResponseEntity.status(HttpStatus.CREATED).body(orderService.getCustomerOrderHistory());
	}

}
