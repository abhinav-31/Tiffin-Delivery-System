package com.tiffin.service;

import java.util.List;
import java.util.Optional;

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
import com.tiffin.enums.DeliveryStatus;
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
		String vendorPincode = vendor.getAddresses().getFirst().getZipcode();
		Order orderPlaced = new Order();
		orderPlaced.setCustomer(customer);
		orderPlaced.setVendor(vendor);
		DeliveryBoy d = findSuitableDeliveryBoy(vendorPincode)
				.orElseThrow(() -> new ResourceNotFoundException("No delivery boy found"));
		orderPlaced.setDeliveryBoy(d);
		d.setStatus(DeliveryStatus.BUSY); // delivery boy has become busy for ongoing delivery

        //orderPlaced.setDeliveryBoy(findSuitableDeliveryBoy()); // Implement suitable logic and only AVAILABLE(logged i) db will be fetched
//		  when suitable delivery boy found -> set status to BUSY
		orderPlaced.setDeliveryAddress(mapper.map(orderRequest.getAddress(), Address.class));
		orderPlaced.setStatus(OrderStatus.PLACED);
		System.out.println(orderPlaced);
		orderRepository.save(orderPlaced);
		for (MenuDTO menuDTO : orderRequest.getMenuItems()) {
			Menu menu = menuRepository.findById(menuDTO.getMenuId())
					.orElseThrow(() -> new ResourceNotFoundException("Menu not found with id " + menuDTO.getMenuId()));

			OrderDetails orderDetails = new OrderDetails();
			orderDetails.setMenuItem(menu);
			orderDetails.setQuantity(menuDTO.getQuantity());
			orderDetails.setOrder(orderPlaced);
			if (menu.getQuantity() - menuDTO.getQuantity() >= 0) {
				menu.setQuantity(menu.getQuantity() - menuDTO.getQuantity());
				orderDetailsRepository.save(orderDetails);
			}

		}

		return new ApiResponse("New Order added with ID: " + orderPlaced.getId());
	}

	public Optional<DeliveryBoy> findSuitableDeliveryBoy(String vendorPincode) {
		Optional<DeliveryBoy> minDistDeliveryBoy = Optional.empty();
		List<String> reference = List.of("411057", "411157", "411058", "411059", "411060", "411061", "411557", "411082",
				"411997", "411050");
		int[][] distMatrix = { { 0, 5, 2, 8, 3, 7, 1, 9, 4, 6 }, { 7, 0, 3, 10, 5, 8, 6, 2, 9, 1 },
				{ 9, 6, 0, 4, 7, 2, 8, 5, 10, 3 }, { 5, 8, 1, 0, 2, 4, 7, 6, 3, 9 }, { 3, 2, 7, 9, 0, 1, 10, 8, 6, 4 },
				{ 1, 4, 6, 5, 3, 0, 9, 7, 2, 8 }, { 10, 3, 4, 6, 9, 2, 0, 1, 7, 5 }, { 6, 7, 9, 1, 8, 3, 5, 0, 2, 10 },
				{ 8, 10, 5, 7, 4, 9, 2, 3, 0, 6 }, { 2, 9, 8, 3, 6, 5, 4, 10, 1, 0 } };
		List<DeliveryBoy> availableDeliveryBoys = deliveryBoyRepository.findByStatus(DeliveryStatus.AVAILABLE);
		int vendorPincodeIndex = reference.indexOf(vendorPincode);
		int deliveryBoyPincodeIndex;
		int min = Integer.MAX_VALUE;
		for (DeliveryBoy d : availableDeliveryBoys) {
			deliveryBoyPincodeIndex = reference.indexOf(d.getCurrentPincode());
			if (distMatrix[deliveryBoyPincodeIndex][vendorPincodeIndex] < min) {
				min = distMatrix[deliveryBoyPincodeIndex][vendorPincodeIndex];
				minDistDeliveryBoy = Optional.of(d);
			}
		}

		return minDistDeliveryBoy;
	}
	
	@Override
	public ApiResponse changeStatus(Long orderId) {
		Order order = orderRepository.findById(orderId).orElseThrow(()-> new ResourceNotFoundException("Order Not Found"));
		order.setStatus(OrderStatus.DELIVERED);
		Address deliveryAddress = order.getDeliveryAddress();
		DeliveryBoy deliveryBoy = order.getDeliveryBoy();
		deliveryBoy.setCurrentPincode(deliveryAddress.getZipcode());
		return new ApiResponse("Order Status Changed to " + OrderStatus.DELIVERED);
		
	}
// order delivered
	// change order status to DELIVERED
	// change delivery boy status to AVAILABLE + set new pincode as
	// order->deliveryaddress->'s pincode
}
