package com.tiffin.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tiffin.dto.UserDTO;
import com.tiffin.enums.Role;
import com.tiffin.service.AdminService;
import com.tiffin.service.ReviewService;

@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

	@Autowired
	private AdminService adminService;

	@Autowired
	private ReviewService reviewService;

	@GetMapping("/vendors")
	public ResponseEntity<?> getVendors() {
		List<UserDTO> vendors = adminService.getUsersByRole(Role.ROLE_VENDOR);
		if (vendors.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(vendors);
	}

	@GetMapping("/customers")
	public ResponseEntity<?> getCustomers() {
		List<UserDTO> customers = adminService.getUsersByRole(Role.ROLE_CUSTOMER);
		if (customers.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(customers);
	}

	@GetMapping("/deliveryBoys")
	public ResponseEntity<?> getDeliveryBoys() {
		List<UserDTO> deliveryBoys = adminService.getUsersByRole(Role.ROLE_DELIVERY_BOY);
		if (deliveryBoys.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(deliveryBoys);
	}

	@GetMapping("/allReviews")
	public ResponseEntity<?> getAllReviews() {
		return ResponseEntity.status(HttpStatus.OK).body(reviewService.getReviews());
	}
}
