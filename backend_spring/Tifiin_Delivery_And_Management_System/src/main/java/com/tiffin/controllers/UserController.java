package com.tiffin.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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
import com.tiffin.dto.AddressReqDTO;
import com.tiffin.dto.SignInResDTO;
import com.tiffin.dto.UserSignInReqDTO;
import com.tiffin.dto.UserSignUpReqDTO;
import com.tiffin.dto.VendorSignUpReqDTO;
import com.tiffin.security.JwtUtils;
import com.tiffin.service.DeliveryBoyService;
import com.tiffin.service.UserService;

import jakarta.validation.Valid;

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
	public ResponseEntity<?> signUpDeliveryBoy(@RequestBody @Valid UserSignUpReqDTO userSignup, AddressReqDTO address) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveDeliveryBoy(userSignup, address));
	}

	@PostMapping(value ="/vendorSignup", consumes="multipart/form-data")
	public ResponseEntity<?> signUpVendor(@RequestPart String userSignup, @RequestPart String address, @RequestParam MultipartFile image) throws IOException {
		System.out.println("email "+userSignup);
//		ObjectMapper mapper = new ObjectMapper();
		VendorSignUpReqDTO vendorSignup = mapper.readValue(userSignup,VendorSignUpReqDTO.class);
		System.out.println("vendDTO " + vendorSignup);
		AddressReqDTO addressDTO = mapper.readValue(address, AddressReqDTO.class);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveVendor(vendorSignup, addressDTO, image));
	}

	@PostMapping("/addCustomerAddresses")
	public ResponseEntity<?> addAddress(@RequestBody @Valid AddressReqDTO address) {
		return ResponseEntity.status(HttpStatus.CREATED).body(userService.addCustomerAddresses(address));
	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> signInUser(@RequestBody @Valid UserSignInReqDTO userSignIn) {
		System.out.println("Hello");
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(userSignIn.getEmail(), userSignIn.getPassword());
		
		Authentication authentication = authManager.authenticate(token);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(new SignInResDTO(jwtUtils.generateJwtToken(authentication),"Successfull Auth!"));
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
