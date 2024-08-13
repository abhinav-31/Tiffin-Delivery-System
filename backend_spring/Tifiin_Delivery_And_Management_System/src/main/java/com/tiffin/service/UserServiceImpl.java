package com.tiffin.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import com.tiffin.custom_exceptions.UserException;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.tiffin.custom_exceptions.ResourceNotFoundException;
import com.tiffin.dto.AddressReqDTO;
import com.tiffin.dto.ApiResponse;
import com.tiffin.dto.UserSignInReqDTO;
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
import jakarta.validation.Valid;

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
	private PasswordEncoder passwordEncoder;

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();

	}

	@Override
	public ApiResponse saveCustomer(UserSignUpReqDTO user) {
		if(userRepository.existsByEmail(user.getEmail()))
			return new ApiResponse("Use another email");
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
	public ApiResponse saveVendor(VendorSignUpReqDTO vendor, AddressReqDTO address, MultipartFile image) throws IOException {
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
		System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
		User u = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString()).orElseThrow(()-> new ResourceNotFoundException("no user found"));
		
		if (u != null) {
			u.addAddress(mapper.map(address, Address.class));
		} else {
			new ResourceNotFoundException("User does not exist!");
		}
		System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
		return new ApiResponse("New Address Added!!!");
	}

	@Override
	public String getUserMail() {
		// TODO Auto-generated method stub
		return SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
	}



	@Override
	public ApiResponse signIn(@Valid UserSignInReqDTO userSignIn) {

		return new ApiResponse("User Validated");
	}

}
