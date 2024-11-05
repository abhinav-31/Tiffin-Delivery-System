package com.tiffin.service;

import java.util.List;

import com.tiffin.dto.*;
import com.tiffin.enums.OrderStatus;

public interface OrderService {

	ApiResponse addOrder(OrderRequestDTO orderRequest, Long vendorId);

	ApiResponse changeStatus(Long orderId);

	List<OrderDetailsResDTO> getOrdersByVendorAndStatus(Long vendorId, OrderStatus status);

	List<OrderDelResDTO> getPlacedForDelivery(OrderStatus status);

	List<CustomerOrderHisResDTO> getCustomerOrderHistory();
}
