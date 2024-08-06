package com.tiffin.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tiffin.dto.AddressReqDTO;
import com.tiffin.dto.UserSignInReqDTO;
import com.tiffin.dto.UserSignUpReqDTO;
import com.tiffin.dto.VendorSignUpReqDTO;
import com.tiffin.service.UserService;

import jakarta.validation.Valid;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserService userService;

	
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
	
	@PostMapping("/customerSignIn")
	public ResponseEntity<?> signInUser(@RequestBody @Valid UserSignInReqDTO userSignIn) {
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(userService.signIn(userSignIn));
	}
}
