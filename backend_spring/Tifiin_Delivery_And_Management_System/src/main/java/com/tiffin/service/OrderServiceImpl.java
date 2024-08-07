package com.tiffin.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.hibernate.Hibernate;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tiffin.custom_exceptions.ResourceNotFoundException;
import com.tiffin.dto.AddressReqDTO;
import com.tiffin.dto.ApiResponse;
import com.tiffin.dto.MenuDTO;
import com.tiffin.dto.OrderRequestDTO;
import com.tiffin.dto.OrderResDTO;
import com.tiffin.dto.ReviewDTO;
import com.tiffin.entities.Address;
import com.tiffin.entities.DeliveryBoy;
import com.tiffin.entities.Menu;
import com.tiffin.entities.Order;
import com.tiffin.entities.OrderDetails;
import com.tiffin.entities.Payment;
import com.tiffin.entities.Review;
import com.tiffin.entities.User;
import com.tiffin.enums.DeliveryStatus;
import com.tiffin.enums.OrderStatus;
import com.tiffin.enums.PaymentMethod;
import com.tiffin.repository.DeliveryBoyRepository;
import com.tiffin.repository.MenuRepository;
import com.tiffin.repository.OrderDetailsRepository;
import com.tiffin.repository.OrderRepository;
import com.tiffin.repository.PaymentRepository;
import com.tiffin.repository.ReviewRepository;
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
	private PaymentRepository paymentRepository;
	
	@Autowired
	private ReviewRepository reviewRepository;
	
	@Autowired
	ModelMapper mapper;

	@Override
	public ApiResponse addOrder(PaymentMethod paymentMethod,OrderRequestDTO orderRequest, Long customerId, Long vendorId) {
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

		// orderPlaced.setDeliveryBoy(findSuitableDeliveryBoy()); // Implement suitable
		// logic and only AVAILABLE(logged i) db will be fetched
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
		Payment payment = mapper.map(orderRequest.getPayment(), Payment.class);
		payment.setAmount(orderRequest.getPayment().getAmount());
		payment.setPaymentMethod(paymentMethod);
		payment.setOrder(orderPlaced);
		paymentRepository.save(payment);
		
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
		Order order = orderRepository.findById(orderId)
				.orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));
		order.setStatus(OrderStatus.DELIVERED);
		Address deliveryAddress = order.getDeliveryAddress();
		DeliveryBoy deliveryBoy = order.getDeliveryBoy();
		deliveryBoy.setCurrentPincode(deliveryAddress.getZipcode());
		return new ApiResponse("Order Status Changed to " + OrderStatus.DELIVERED);

	}

	@Override
	public List<OrderResDTO> getOrdersByVendorAndStatus(Long vendorId, OrderStatus status) {
		List<OrderResDTO> list = new ArrayList<>();
		User vendor = userRepository.findById(vendorId)
				.orElseThrow(() -> new ResourceNotFoundException("Vendor not found!!"));

		List<Order> orders = orderRepository.findByVendor(vendor);

		for (Order o : orders) {
			if (o.getStatus().equals(status)) {
				System.out.println(o);
				OrderResDTO obj = new OrderResDTO();
				obj.setCustomer(o.getCustomer());
				obj.setDeliveryBoy(o.getDeliveryBoy().getDeliveryBoy());
				obj.setDeliveryAddress(mapper.map(o.getDeliveryAddress(), AddressReqDTO.class));
				list.add(obj);
			}
		}
		return list;
	}
	
	@Override
	public ApiResponse addReview(Long orderId, Long customerId, ReviewDTO addReview) {
		User customer = userRepository.findById(customerId)
				.orElseThrow(() -> new ResourceNotFoundException("Customer Not Found"));
		Order order = orderRepository.findOrderByIdAndStatus(orderId,OrderStatus.DELIVERED).orElseThrow(()-> new ResourceNotFoundException("No order exist"));
		Review review = mapper.map(addReview, Review.class);
		review.setCustomer(customer);
		review.setOrder(order);
		review.setVendor(order.getVendor());
		reviewRepository.save(review);
		return new ApiResponse("Review Added for order id "+order.getId() +" by customer : " + customer.getFirstName());
	}
// order delivered
	// change order status to DELIVERED
	// change delivery boy status to AVAILABLE + set new pincode as
	// order->deliveryaddress->'s pincode
}
