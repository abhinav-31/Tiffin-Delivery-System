package com.tiffin.service;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
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

	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();

	}

	@Override
	public ApiResponse saveCustomer(UserSignUpReqDTO user) {
		User u = mapper.map(user, User.class);
		u.setRole(Role.ROLE_CUSTOMER);
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
	public ApiResponse addCustomerAddresses(AddressReqDTO address, Long userId) {
		User u = userRepository.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("user does not exist"));
		u.addAddress(mapper.map(address, Address.class));
		return new ApiResponse("New Address Added!!!");
	}

	@Override
	public ApiResponse signIn(@Valid UserSignInReqDTO userSignIn) {
		
		return new ApiResponse("User Validated");
	}
}
