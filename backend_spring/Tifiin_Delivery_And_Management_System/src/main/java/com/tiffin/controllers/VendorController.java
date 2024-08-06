package com.tiffin.controllers;

import com.tiffin.dto.AddressReqDTO;
import com.tiffin.dto.UserSignUpReqDTO;
import com.tiffin.dto.VendorSignUpReqDTO;
import com.tiffin.entities.User;
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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.resource.HttpResource;

@RestController
@RequestMapping("/vendor")
public class VendorController {
	@Autowired
	private UserService userService;

	@GetMapping
	public List<User> initializeData() {
		List<User> users = userService.getAllUsers();

		return users;
	}

	@PostMapping("/customerSignup")
	public ResponseEntity<?> signUpCustomer(@RequestBody @Valid UserSignUpReqDTO userSignup) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveCustomer(userSignup));
	}

	@PostMapping("/deliveryBoySignup")
	public ResponseEntity<?> signUpDeliveryBoy(@RequestBody @Valid UserSignUpReqDTO userSignup, AddressReqDTO address) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveDeliveryBoy(userSignup, address));
	}

	@PostMapping("/vendorSignup")
	public ResponseEntity<?> signUpVendor(@RequestBody @Valid VendorSignUpReqDTO userSignup, AddressReqDTO address) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveVendor(userSignup, address));
	}

	@PostMapping("/{userId}/addCustomerAddresses")
	public ResponseEntity<?> addAddress(@RequestBody @Valid AddressReqDTO address, @PathVariable Long userId) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.addCustomerAddresses(address, userId));
	}
}
