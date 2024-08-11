package com.tiffin.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

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
		User u = mapper.map(user, User.class);
		u.setPassword(passwordEncoder.encode(u.getPassword()));
		u.setRole(u.getRole());
		userRepository.save(u);
		return new ApiResponse("New Customer Added!!!");
	}

	@Override
	public ApiResponse saveDeliveryBoy(UserSignUpReqDTO deliveryBoy, AddressReqDTO address) {
		User u = mapper.map(deliveryBoy, User.class);
		u.setRole(Role.ROLE_DELIVERY_BOY);
		u.addAddress(mapper.map(address, Address.class));
		userRepository.save(u);
		System.out.println(u.getId());
		DeliveryBoy d = new DeliveryBoy(u, DeliveryStatus.AVAILABLE, address.getZipcode());
		System.out.println(d);
		deliveryBoyRepository.save(d);
		return new ApiResponse("New Delivery Boy Added!!!");
	}

	@Override
	public ApiResponse saveVendor(VendorSignUpReqDTO vendor, AddressReqDTO address) {
		User u = mapper.map(vendor, User.class);
		u.setRole(Role.ROLE_VENDOR);
		u.addAddress(mapper.map(address, Address.class));
		userRepository.save(u);
		return new ApiResponse("New Vendor Added!!!");
	}

	@Override
	public ApiResponse addCustomerAddresses(AddressReqDTO address) {
		User u = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString()).orElseThrow(()-> new ResourceNotFoundException("no user found"));
//		User u = userRepository
//				.findByEmail(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
//				.orElseThrow(() -> new ResourceNotFoundException("user does not exist"));
		if (u != null) {
			System.out.println("kya");
			u.addAddress(mapper.map(address, Address.class));
		} else {
			System.out.println("kyu");
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
