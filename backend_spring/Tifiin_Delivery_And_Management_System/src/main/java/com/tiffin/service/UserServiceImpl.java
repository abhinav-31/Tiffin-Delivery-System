package com.tiffin.service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tiffin.custom_exceptions.ResourceNotFoundException;
import com.tiffin.dto.AddressReqDTO;
import com.tiffin.dto.AddressResDTO;
import com.tiffin.dto.ApiResponse;
import com.tiffin.dto.UserSignUpReqDTO;
import com.tiffin.dto.VendorSignUpReqDTO;
import com.tiffin.entities.Address;
import com.tiffin.entities.DeliveryBoy;
import com.tiffin.entities.User;
import com.tiffin.enums.DeliveryStatus;
import com.tiffin.enums.Role;
import com.tiffin.repository.DeliveryBoyRepository;
import com.tiffin.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private DeliveryBoyRepository deliveryBoyRepository;
	@Autowired
	private ModelMapper mapper;

	@Autowired
	ObjectMapper objectMapper;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();

	}

	@Override
	public ApiResponse saveCustomer(UserSignUpReqDTO user) {
		if(userRepository.existsByEmail(user.getEmail()))
			return new ApiResponse("Email already exist");
		User u = mapper.map(user, User.class);
		u.setPassword(passwordEncoder.encode(u.getPassword()));
		u.setRole(u.getRole());
		userRepository.save(u);
		return new ApiResponse("New Customer Added!!!");
	}

	@Override
	public ApiResponse saveDeliveryBoy(UserSignUpReqDTO deliveryBoy, AddressReqDTO address) {
		if(userRepository.existsByEmail(deliveryBoy.getEmail()))
			return new ApiResponse("Use another email");
		User u = mapper.map(deliveryBoy, User.class);
		u.setRole(Role.ROLE_DELIVERY_BOY);
		u.setPassword(passwordEncoder.encode(u.getPassword()));
		u.addAddress(mapper.map(address, Address.class));
		userRepository.save(u);
		DeliveryBoy d = new DeliveryBoy(u, DeliveryStatus.AVAILABLE, address.getZipcode());
		deliveryBoyRepository.save(d);
		return new ApiResponse("New Delivery Boy Added!!!");
	}
	
	@Override 
	public ApiResponse saveVendor(String vendorSignup, String addressDto, MultipartFile image) throws IOException {
		VendorSignUpReqDTO vendor = objectMapper.readValue(vendorSignup, VendorSignUpReqDTO.class);
		AddressReqDTO address = objectMapper.readValue(addressDto, AddressReqDTO.class);
		if(userRepository.existsByEmail(vendor.getEmail()))
			return new ApiResponse("Use another email") ;
		User u = mapper.map(vendor, User.class);
		u.setRole(Role.ROLE_VENDOR);
		u.setPassword(passwordEncoder.encode(u.getPassword()));
		u.addAddress(mapper.map(address, Address.class));
		u.setUserImage(image.getBytes());
		userRepository.save(u);
		return new ApiResponse("New Vendor Added!!!");
	}
	
	@Override
	public ApiResponse addCustomerAddresses(AddressReqDTO address) {
		User u = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString()).orElseThrow(()-> new ResourceNotFoundException("no user found"));
		
		if (u != null) {
			u.addAddress(mapper.map(address, Address.class));
		} else {
			throw new ResourceNotFoundException("User does not exist!");
		}
		return new ApiResponse("New Address Added!!!");
	}

	@Override
	public String getUserMail() {
		return SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
	}

	@Override
	public List<AddressResDTO> getAllCustomerAddresses() {
	    User customer = userRepository.findByEmail(getUserMail())
	        .orElseThrow(() -> new ResourceNotFoundException("No user found"));
	    // Convert List<Address> to List<AddressResDTO>
	    return customer.getAddresses().stream()
	        .map(address -> new AddressResDTO(
	            address.getAdrLine1(),
	            address.getAdrLine2(),
	            address.getCity(),
	            address.getState(),
	            address.getCountry(),
	            address.getZipcode(),
	            address.getPhoneNo()))
	        .collect(Collectors.toList());
	}

}
