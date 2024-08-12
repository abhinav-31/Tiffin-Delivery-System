package com.tiffin.service;

import java.util.List;

import com.tiffin.dto.*;
import com.tiffin.enums.OrderStatus;
import com.tiffin.enums.PaymentMethod;

public interface OrderService {

	ApiResponse addOrder(PaymentMethod paymentMethod,OrderRequestDTO orderRequest, Long customerId, Long vendorId);

	ApiResponse changeStatus(Long orderId);

	ApiResponse addReview(Long orderId, Long customerId, ReviewDTO review);
	
	List<OrderResDTO> getOrdersByVendorAndStatus(Long vendorId, OrderStatus status);

	List<OrderDelResDTO> getPlacedForDelivery(Long deliveryBoyId, OrderStatus status);
}
