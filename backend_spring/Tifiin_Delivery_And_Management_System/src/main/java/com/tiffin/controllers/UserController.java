package com.tiffin.controllers;

import com.tiffin.dto.*;
import com.tiffin.security.CustomUserDetails;
import org.apache.catalina.authenticator.SpnegoAuthenticator.AuthenticateAction;
import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tiffin.security.JwtUtils;
import com.tiffin.service.DeliveryBoyService;
import com.tiffin.service.UserService;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/users")
public class UserController {
	@Autowired
	private UserService userService;
	@Autowired
	private DeliveryBoyService deliveryBoyService;
	@Autowired
	private JwtUtils jwtUtils;
	@Autowired
	private ObjectMapper mapper;
	@Autowired
	private AuthenticationManager authManager;

	@GetMapping("/welcome")
	public String welcome() {
		return "Welcome";
	}

	@PostMapping("/signup")
	public ResponseEntity<?> signUpCustomer(@RequestBody @Valid UserSignUpReqDTO userSignup) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveCustomer(userSignup));
	}

	@PostMapping("/deliveryBoySignup")
	public ResponseEntity<?> signUpDeliveryBoy(@RequestBody @Valid DeliveryBoySignUpReqDTO deliveryBoySignUpReqDTO) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService
				.saveDeliveryBoy(deliveryBoySignUpReqDTO.getUserSignUpReqDTO(), deliveryBoySignUpReqDTO.getAddressReqDTO()));
	}

	@PostMapping(value = "/vendorSignup", consumes = "multipart/form-data")
	public ResponseEntity<?> signUpVendor(@RequestPart String userSignup, @RequestPart String address,
			@RequestParam MultipartFile image) throws IOException {
		// System.out.println("email " + userSignup);
		// ObjectMapper mapper = new ObjectMapper();
		VendorSignUpReqDTO vendorSignup = mapper.readValue(userSignup, VendorSignUpReqDTO.class);
		// System.out.println("vendDTO " + vendorSignup);
		AddressReqDTO addressDTO = mapper.readValue(address, AddressReqDTO.class);

		return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveVendor(vendorSignup, addressDTO, image));
	}

	@PostMapping("/addCustomerAddresses")
	public ResponseEntity<?> addAddress(@RequestBody @Valid AddressReqDTO address) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.addCustomerAddresses(address));
	}

	@PostMapping("/signin")
	public ResponseEntity<?> signInUser(@RequestBody @Valid UserSignInReqDTO userSignIn) {
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userSignIn.getEmail(),
				userSignIn.getPassword());
		Authentication authentication = authManager.authenticate(token);

		// Assuming CustomUserDetailsService is used to load user details with roles
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		String role = userDetails.getAuthorities().toString().replaceAll("[\\[\\]]", "");
		String email = userDetails.getUsername();
		Long id = userDetails.getUserId();
		// This method should return the user's role

		return ResponseEntity.status(HttpStatus.ACCEPTED)
				.body(new SignInResDTO(jwtUtils.generateJwtToken(authentication), "Successful Auth!", role, email, id));
	}

	@GetMapping("/getCustomerAddresses")
	public ResponseEntity<?> getCustomerAddress() {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.getAllCustomerAddresses());
	}
	// @PostMapping("/vendorSignIn")
	// public ResponseEntity<?> signInVendor(@RequestBody @Valid UserSignInReqDTO
	// userSignIn) {
	// return
	// ResponseEntity.status(HttpStatus.ACCEPTED).body(userService.signIn(userSignIn));
	// }
	//
	// @PostMapping("/deliveryBoySignIn")
	// public ResponseEntity<?> signInDeliveryBoy(@RequestBody @Valid
	// UserSignInReqDTO userSignIn) {
	// String resp = "resp";
	//
	// return ResponseEntity.status(HttpStatus.ACCEPTED).body(resp);
	// }
}
