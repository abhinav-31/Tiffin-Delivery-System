package com.tiffin.service;

import java.util.List;

import com.tiffin.dto.AddressReqDTO;
import com.tiffin.dto.ApiResponse;
import com.tiffin.dto.UserSignUpReqDTO;
import com.tiffin.dto.VendorSignUpReqDTO;
import com.tiffin.entities.User;

public interface UserService {
	public ApiResponse saveCustomer(UserSignUpReqDTO customer);

	public ApiResponse saveDeliveryBoy(UserSignUpReqDTO deliveryBoy, AddressReqDTO address);

	public ApiResponse saveVendor(VendorSignUpReqDTO vendor, AddressReqDTO address);

	public ApiResponse addCustomerAddresses(AddressReqDTO address, Long userId);

	public List<User> getAllUsers();
}
