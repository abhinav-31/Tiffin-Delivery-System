package com.tiffin.controllers;

import com.tiffin.dto.AddressReqDTO;
import com.tiffin.dto.UserSignUpReqDTO;
import com.tiffin.dto.VendorSignUpReqDTO;
import com.tiffin.entities.User;
import com.tiffin.enums.OrderStatus;
import com.tiffin.service.OrderService;
import com.tiffin.service.UserService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.resource.HttpResource;

@RestController
@RequestMapping("/vendor")
public class VendorController {
	@Autowired
	private UserService userService;
	
	@Autowired
	private OrderService orderService;

	@GetMapping("/{vendorId}")
	public ResponseEntity<?> getOrdersByStatus(@RequestParam OrderStatus status, @PathVariable Long vendorId)
	{
		return ResponseEntity.status(HttpStatus.OK)
				.body(orderService.getOrdersByVendorAndStatus(vendorId, status));
	}
}
