package com.tiffin.controllers;

import com.tiffin.security.CustomUserDetails;
import org.apache.catalina.authenticator.SpnegoAuthenticator.AuthenticateAction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Role;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tiffin.dto.AddressReqDTO;
import com.tiffin.dto.SignInResDTO;
import com.tiffin.dto.UserSignInReqDTO;
import com.tiffin.dto.UserSignUpReqDTO;
import com.tiffin.dto.VendorSignUpReqDTO;
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
	public ResponseEntity<?> signUpDeliveryBoy(@RequestBody @Valid UserSignUpReqDTO userSignup, AddressReqDTO address) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveDeliveryBoy(userSignup, address));
	}

	@PostMapping("/vendorSignup")
	public ResponseEntity<?> signUpVendor(@RequestBody @Valid VendorSignUpReqDTO userSignup, AddressReqDTO address) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveVendor(userSignup, address));
	}

	@PostMapping("/addCustomerAddresses")
	public ResponseEntity<?> addAddress(@RequestBody @Valid AddressReqDTO address) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.addCustomerAddresses(address));
	}

	@PostMapping("/signin")
	public ResponseEntity<?> signInUser(@RequestBody @Valid UserSignInReqDTO userSignIn) {
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userSignIn.getEmail(), userSignIn.getPassword());
		Authentication authentication = authManager.authenticate(token);

		// Assuming CustomUserDetailsService is used to load user details with roles
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		String role = userDetails.getAuthorities().toString().replaceAll("[\\[\\]]", "");
		// This method should return the user's role

		return ResponseEntity.status(HttpStatus.ACCEPTED)
						.body(new SignInResDTO(jwtUtils.generateJwtToken(authentication), "Successful Auth!", role));
	}


//	@PostMapping("/vendorSignIn")
//	public ResponseEntity<?> signInVendor(@RequestBody @Valid UserSignInReqDTO userSignIn) {
//		return ResponseEntity.status(HttpStatus.ACCEPTED).body(userService.signIn(userSignIn));
//	}
//	
//	@PostMapping("/deliveryBoySignIn")
//	public ResponseEntity<?> signInDeliveryBoy(@RequestBody @Valid UserSignInReqDTO userSignIn) {
//		String resp = "resp";
//		
//		return ResponseEntity.status(HttpStatus.ACCEPTED).body(resp);
//	}
}
