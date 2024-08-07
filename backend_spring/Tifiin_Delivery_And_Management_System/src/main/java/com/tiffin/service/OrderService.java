package com.tiffin.service;

import java.util.List;

import com.tiffin.dto.AddressReqDTO;
import com.tiffin.dto.ApiResponse;
import com.tiffin.dto.MenuDTO;
import com.tiffin.dto.OrderRequestDTO;
import com.tiffin.dto.ReviewDTO;
import com.tiffin.entities.Menu;
import com.tiffin.enums.PaymentMethod;

import jakarta.validation.Valid;

public interface OrderService {

	ApiResponse addOrder(PaymentMethod paymentMethod,OrderRequestDTO orderRequest, Long customerId, Long vendorId);

	ApiResponse changeStatus(Long orderId);

	ApiResponse addReview(Long orderId, Long customerId, ReviewDTO review);

}
