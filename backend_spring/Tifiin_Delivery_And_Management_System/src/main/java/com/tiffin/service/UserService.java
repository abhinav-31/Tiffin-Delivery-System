package com.tiffin.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;
import com.tiffin.dto.AddressReqDTO;
import com.tiffin.dto.AddressResDTO;
import com.tiffin.dto.ApiResponse;
import com.tiffin.dto.UserSignUpReqDTO;
import com.tiffin.entities.User;


public interface UserService {
	public ApiResponse saveCustomer(UserSignUpReqDTO customer);

	public ApiResponse saveDeliveryBoy(UserSignUpReqDTO deliveryBoy, AddressReqDTO address);
	
	public ApiResponse saveVendor(String userSignup, String address, MultipartFile image) throws IOException;

	public ApiResponse addCustomerAddresses(AddressReqDTO address);

	public List<User> getAllUsers();

	String getUserMail();

	public List<AddressResDTO> getAllCustomerAddresses();
}
