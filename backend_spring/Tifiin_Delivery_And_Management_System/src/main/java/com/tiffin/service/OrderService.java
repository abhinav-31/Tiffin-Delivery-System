package com.tiffin.service;

import java.util.List;

import com.tiffin.dto.AddressReqDTO;
import com.tiffin.dto.ApiResponse;
import com.tiffin.dto.MenuDTO;
import com.tiffin.dto.OrderRequestDTO;
import com.tiffin.entities.Menu;

import jakarta.validation.Valid;

public interface OrderService {

	ApiResponse addOrder(OrderRequestDTO orderRequest, Long customerId, Long vendorId);

	ApiResponse changeStatus(Long orderId);

}
