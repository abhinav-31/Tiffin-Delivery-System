package com.tiffin.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.tiffin.dto.AddressReqDTO;
import com.tiffin.dto.AddressResDTO;
import com.tiffin.dto.ApiResponse;
import com.tiffin.dto.UserSignInReqDTO;
import com.tiffin.dto.UserSignUpReqDTO;
import com.tiffin.dto.VendorSignUpReqDTO;
import com.tiffin.entities.User;

import jakarta.validation.Valid;

public interface UserService {
	public ApiResponse saveCustomer(UserSignUpReqDTO customer);

	public ApiResponse saveDeliveryBoy(UserSignUpReqDTO deliveryBoy, AddressReqDTO address);

	public ApiResponse saveVendor(VendorSignUpReqDTO vendor, AddressReqDTO address, MultipartFile image) throws IOException;

	public ApiResponse addCustomerAddresses(AddressReqDTO address);

	public List<User> getAllUsers();

	public ApiResponse signIn(@Valid UserSignInReqDTO userSignIn);

	String getUserMail();

	public List<AddressResDTO> getAllCustomerAddresses();
}
