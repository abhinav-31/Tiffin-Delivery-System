package com.tiffin.service;

import java.util.List;

import com.tiffin.dto.AddressReqDTO;
import com.tiffin.dto.ApiResponse;
import com.tiffin.dto.MenuDTO;
import com.tiffin.dto.OrderRequestDTO;
import com.tiffin.dto.OrderResDTO;
import com.tiffin.entities.Menu;
import com.tiffin.enums.OrderStatus;

import jakarta.validation.Valid;

public interface OrderService {

	ApiResponse addOrder(OrderRequestDTO orderRequest, Long customerId, Long vendorId);

	ApiResponse changeStatus(Long orderId);

	List<OrderResDTO> getOrdersByVendorAndStatus(Long vendorId, OrderStatus status);

}
