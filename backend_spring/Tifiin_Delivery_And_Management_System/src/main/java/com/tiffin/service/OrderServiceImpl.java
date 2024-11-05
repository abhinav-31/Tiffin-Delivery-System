package com.tiffin.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.tiffin.custom_exceptions.ResourceNotFoundException;
import com.tiffin.dto.AddressReqDTO;
import com.tiffin.dto.ApiResponse;
import com.tiffin.dto.CustomerOrderHisResDTO;
import com.tiffin.dto.MenuDTO;
import com.tiffin.dto.OrderDelResDTO;
import com.tiffin.dto.OrderDetailsResDTO;
import com.tiffin.dto.OrderMenuDetailsResDTO;
import com.tiffin.dto.OrderRequestDTO;
import com.tiffin.dto.OrderResDTO;
import com.tiffin.dto.UserDTO;
import com.tiffin.entities.Address;
import com.tiffin.entities.DeliveryBoy;
import com.tiffin.entities.Menu;
import com.tiffin.entities.Order;
import com.tiffin.entities.OrderDetails;
import com.tiffin.entities.Payment;
import com.tiffin.entities.User;
import com.tiffin.enums.DeliveryStatus;
import com.tiffin.enums.OrderStatus;
import com.tiffin.enums.PaymentMethod;
import com.tiffin.repository.DeliveryBoyRepository;
import com.tiffin.repository.MenuRepository;
import com.tiffin.repository.OrderDetailsRepository;
import com.tiffin.repository.OrderRepository;
import com.tiffin.repository.PaymentRepository;
import com.tiffin.repository.UserRepository;

import jakarta.transaction.Transactional;

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
	private PaymentRepository paymentRepository;

	@Autowired
	private FindDistanceService findDistance;
	

	@Autowired
	ModelMapper mapper;
	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;

	@Override
	public ApiResponse addOrder(OrderRequestDTO orderRequest, Long vendorId) {
		User customer = userRepository
				.findByEmail(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())
				.orElseThrow(() -> new ResourceNotFoundException("Customer Not Found"));
		User vendor = userRepository.findById(vendorId)
				.orElseThrow(() -> new ResourceNotFoundException("Vendor Not Found"));
		String vendorPincode = vendor.getAddresses().getFirst().getZipcode();
		
		Order orderPlaced = new Order();
		orderPlaced.setCustomer(customer);
		orderPlaced.setVendor(vendor);

		DeliveryBoy d = findDistance.findSuitableDeliveryBoy(vendorPincode).orElseThrow(()-> new ResourceNotFoundException("No Delivery Boy Found"));
		orderPlaced.setDeliveryBoy(d);
		d.setStatus(DeliveryStatus.BUSY);
		
		orderPlaced.setDeliveryAddress(mapper.map(orderRequest.getAddress(), Address.class));
		orderPlaced.setStatus(OrderStatus.PLACED);
		orderRepository.save(orderPlaced);
		for (MenuDTO menuDTO : orderRequest.getMenuItems()) {
			Menu menu = menuRepository.findById(menuDTO.getId())
					.orElseThrow(() -> new ResourceNotFoundException("Menu not found with id " + menuDTO.getId()));

			OrderDetails orderDetails = new OrderDetails();
			orderDetails.setMenuItem(menu);
			orderDetails.setQuantity(menuDTO.getQuantity());
			orderDetails.setOrder(orderPlaced);
			if (menu.getQuantity() - menuDTO.getQuantity() >= 0) {
				menu.setQuantity(menu.getQuantity() - menuDTO.getQuantity());
				orderDetailsRepository.save(orderDetails);
			} else {
				throw new ResourceNotFoundException("Quantity is not available");
			}
		}
		Payment payment = mapper.map(orderRequest.getPayment(), Payment.class);
		payment.setAmount(orderRequest.getPayment().getAmount());
//		System.out.println("PAYMENT METHOD:- " + orderRequest.getPayment().getPaymentMethod());
		payment.setPaymentMethod(PaymentMethod.valueOf(orderRequest.getPayment().getPaymentMethod()));
		payment.setOrder(orderPlaced);
		paymentRepository.save(payment);

		notifyVendor(vendor.getId(), orderPlaced);
		notifyDeliveryBoy(d.getDeliveryBoy().getId(),orderPlaced);
		return new ApiResponse("Order placed successfully!");
	}

	private void notifyVendor(Long vendorId, Order order) {
	    // Assuming the vendor has a unique username or an identifier you can use
	    String vendorDestination = "/topic/vendor/" + vendorId; // Change this if needed
	    simpMessagingTemplate.convertAndSend(vendorDestination, "New order placed: " + order.getId());
	}
	private void notifyDeliveryBoy(Long deliveryBoyId, Order order) {
	    // Assuming the delivery boy has a unique username or an identifier you can use
	    String deliveryBoyDestination = "/topic/deliveryBoy/" + deliveryBoyId; // Change this if needed
	    simpMessagingTemplate.convertAndSend(deliveryBoyDestination, "New order assigned: " + order.getId());
	}
	@Override
	public ApiResponse changeStatus(Long orderId) {
		Order order = orderRepository.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));
		order.setStatus(OrderStatus.DELIVERED);
		Address deliveryAddress = order.getDeliveryAddress();
		DeliveryBoy deliveryBoy = order.getDeliveryBoy();
		deliveryBoy.setCurrentPincode(deliveryAddress.getZipcode());
		deliveryBoy.setStatus(DeliveryStatus.AVAILABLE);
		return new ApiResponse("Order Status Changed to " + OrderStatus.DELIVERED);
	}

	@Override
	public List<OrderDetailsResDTO> getOrdersByVendorAndStatus(Long vendorId, OrderStatus status) {
		User vendor = userRepository.findById(vendorId)
				.orElseThrow(() -> new ResourceNotFoundException("Vendor not found!!"));

		List<Order> orders = orderRepository.findByVendor(vendor);
		return orders.stream().filter(order -> order.getStatus().equals(status)).map(order -> {
			// Map customer and delivery boy details
			OrderResDTO orderResDTO = new OrderResDTO();
			orderResDTO.setCustomer(mapper.map(order.getCustomer(), UserDTO.class));
			orderResDTO.setDeliveryBoy(mapper.map(order.getDeliveryBoy().getDeliveryBoy(), UserDTO.class));
			AddressReqDTO addressDto = mapper.map(order.getDeliveryAddress(), AddressReqDTO.class);
			orderResDTO.setDeliveryAddress(addressDto);

			// Map order menu details
			List<OrderMenuDetailsResDTO> menuItemsList = orderDetailsRepository.findByOrder(order).stream()
					.map(orderDetail -> {
						Menu menu = orderDetail.getMenuItem();
						return new OrderMenuDetailsResDTO(menu.getName(), orderDetail.getQuantity(), menu.getPrice());
					}).toList();

			// Calculate total amount
			double totalAmount = menuItemsList.stream().mapToDouble(item -> item.getQuantity() * item.getPrice()).sum();

			// Create the final OrderDetailsResDTO object
			OrderDetailsResDTO orderDetailsResDTO = new OrderDetailsResDTO();
			orderDetailsResDTO.setCustomerAndDeliveryDetails(orderResDTO);
			orderDetailsResDTO.setMenuItems(menuItemsList);
			orderDetailsResDTO.setTotalAmount(totalAmount);
			return orderDetailsResDTO;
		}).toList();
	}

	@Override
	public List<OrderDelResDTO> getPlacedForDelivery(OrderStatus status) {
		List<OrderDelResDTO> list = new ArrayList<>();
		
		User deliveryBoy = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())
				.orElseThrow(() -> new ResourceNotFoundException("Delivery Boy not found!!"));
		DeliveryBoy delivery_details = deliveryBoyRepository.findByDeliveryBoy(deliveryBoy)
				.orElseThrow(() -> new ResourceNotFoundException("Delivery details not found!!"));

		List<Order> orders = orderRepository.findByDeliveryBoy(delivery_details);
		for (Order order : orders) {
			if (order.getStatus().equals(status)) {
				OrderDelResDTO dto = new OrderDelResDTO();
				dto.setCustomer(mapper.map(order.getCustomer(), UserDTO.class));
				dto.setVendor(mapper.map(order.getVendor(), UserDTO.class));
				AddressReqDTO addressDto = mapper.map(order.getDeliveryAddress(), AddressReqDTO.class);
				dto.setDeliveryAddress(addressDto);
				dto.setOrderId(order.getId());
				Payment earnedAmount = paymentRepository.findByOrder(order)
						.orElseThrow(() -> new ResourceNotFoundException("Order not found"));
				dto.setPaymentMethod(earnedAmount.getPaymentMethod());
				int deliveryDistance = findDistance.deliveryDistanceBetweenVendorAndCust(order.getDeliveryAddress().getZipcode(),
						order.getVendor().getAddresses().getFirst().getZipcode());
				dto.setEarnedAmount(deliveryDistance * 0.2);
				list.add(dto);
			}
		}
		return list;
	}

	@Override
	public List<CustomerOrderHisResDTO> getCustomerOrderHistory() {
		User user = userRepository
				.findByEmail(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())
				.orElseThrow(() -> new ResourceNotFoundException("No user found"));

		return orderRepository.findAllDeliveredOrder(user, OrderStatus.DELIVERED).stream().flatMap(order -> {
			// Get vendor business name
			User vendor = userRepository.findById(order.getVendor().getId())
					.orElseThrow(() -> new ResourceNotFoundException("Vendor Not Found"));
			String vendorBusinessName = vendor.getBusinessName();

			// Get order details
			List<CustomerOrderHisResDTO> orderHistoryList = orderDetailsRepository.findByOrder(order).stream()
					.map(orderDetail -> {
						Menu menu = menuRepository.findById(orderDetail.getMenuItem().getId())
								.orElseThrow(() -> new ResourceNotFoundException("Menu Not Found"));
						String menuName = menu.getName();
						int quantity = orderDetail.getQuantity();

						// Get payment details
						Payment payment = paymentRepository.findByOrder(order)
								.orElseThrow(() -> new ResourceNotFoundException("Payment Not Found"));
						double totalAmount = payment.getAmount();

						return new CustomerOrderHisResDTO(order.getId(), vendorBusinessName, menuName, quantity,
								totalAmount);
					}).collect(Collectors.toList());
			return orderHistoryList.stream();
		}).collect(Collectors.toList());
	}
}
