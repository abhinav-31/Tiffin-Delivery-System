package com.tiffin.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tiffin.custom_exceptions.ResourceNotFoundException;
import com.tiffin.dto.AddressReqDTO;
import com.tiffin.dto.ApiResponse;
import com.tiffin.dto.MenuDTO;
import com.tiffin.dto.OrderRequestDTO;
import com.tiffin.entities.Address;
import com.tiffin.entities.DeliveryBoy;
import com.tiffin.entities.Menu;
import com.tiffin.entities.Order;
import com.tiffin.entities.OrderDetails;
import com.tiffin.entities.User;
import com.tiffin.enums.OrderStatus;
import com.tiffin.repository.DeliveryBoyRepository;
import com.tiffin.repository.MenuRepository;
import com.tiffin.repository.OrderDetailsRepository;
import com.tiffin.repository.OrderRepository;
import com.tiffin.repository.UserRepository;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private DeliveryBoyRepository deliveryBoyRepository;
	@Autowired
	private OrderDetailsRepository orderDetailsRepository;
	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private MenuRepository menuRepository;

	@Autowired
	ModelMapper mapper;

	@Override
	public ApiResponse addOrder(OrderRequestDTO orderRequest, Long customerId, Long vendorId) {
		User customer = userRepository.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer Not Found"));
		User vendor = userRepository.findById(vendorId)
				.orElseThrow(() -> new ResourceNotFoundException("Vendor Not Found"));

		Order orderPlaced = new Order();
		orderPlaced.setCustomer(customer);
		orderPlaced.setVendor(vendor);
//        orderPlaced.setDeliveryBoy(findSuitableDeliveryBoy()); // Implement suitable logic and only AVAILABLE(logged i) db will be fetched
//		  when suitable delivery boy found -> set status to BUSY
		orderPlaced.setDeliveryAddress(mapper.map(orderRequest.getAddress(), Address.class)); 
		orderPlaced.setStatus(OrderStatus.PLACED);

		orderRepository.save(orderPlaced);

		for (MenuDTO menuDTO : orderRequest.getMenuItems()) {
			Menu menu = menuRepository.findById(menuDTO.getMenuId())
					.orElseThrow(() -> new ResourceNotFoundException("Menu not found with id " + menuDTO.getMenuId()));

			OrderDetails orderDetails = new OrderDetails();
			orderDetails.setMenuItem(menu);
			orderDetails.setQuantity(menuDTO.getQuantity());
			orderDetails.setOrder(orderPlaced);

			orderDetailsRepository.save(orderDetails);
		}

		return new ApiResponse("New Order added with ID: " + orderPlaced.getId());
	}

	public DeliveryBoy findSuitableDeliveryBoy() {
		
		return new DeliveryBoy();
	}

}
