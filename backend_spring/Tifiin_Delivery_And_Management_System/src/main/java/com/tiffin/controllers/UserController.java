package com.tiffin.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;
import jakarta.validation.Valid;

import com.tiffin.dto.*;
import com.tiffin.service.AuthenticationService;
import com.tiffin.service.UserService;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	private UserService userService;

	@Autowired
	private AuthenticationService authenticationService;

	@PostMapping("/signup")
	public ResponseEntity<?> signUpCustomer(@RequestBody @Valid UserSignUpReqDTO userSignup) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveCustomer(userSignup));
	}

	@PostMapping("/deliveryBoySignup")
	public ResponseEntity<?> signUpDeliveryBoy(@RequestBody @Valid DeliveryBoySignUpReqDTO deliveryBoySignUpReqDTO) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveDeliveryBoy(
				deliveryBoySignUpReqDTO.getUserSignUpReqDTO(), deliveryBoySignUpReqDTO.getAddressReqDTO()));
	}

	@PostMapping(value = "/vendorSignup", consumes = "multipart/form-data")
	public ResponseEntity<?> signUpVendor(@RequestPart String userSignup, @RequestPart String address,
			@RequestParam MultipartFile image) throws IOException {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveVendor(userSignup, address, image));
	}

	@PostMapping("/addCustomerAddresses")
	public ResponseEntity<?> addAddress(@RequestBody @Valid AddressReqDTO address) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.addCustomerAddresses(address));
	}

	@PostMapping("/signin")
	public ResponseEntity<?> signInUser(@RequestBody @Valid UserSignInReqDTO userSignIn) {
		SignInResDTO response = authenticationService.authenticateUser(userSignIn);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
	}

	@GetMapping("/getCustomerAddresses")
	public ResponseEntity<?> getCustomerAddress() {
		return ResponseEntity.status(HttpStatus.OK).body(userService.getAllCustomerAddresses());
	}

}
