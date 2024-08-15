package com.tiffin.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.tiffin.dto.*;
import org.hibernate.Hibernate;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.tiffin.custom_exceptions.ResourceNotFoundException;
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

  private static final List<String> reference = List.of("411057",
		    "411157",
		    "411058",
		    "411059",
		    "411060",
		    "411061",
		    "411557",
		    "411082",
		    "411997",
		    "411050");
  private static final int[][] distMatrix = {{0, 5, 2, 8, 3, 7, 1, 9, 4, 6}, {7, 0, 3, 10, 5, 8, 6, 2, 9, 1}, {9, 6, 0, 4, 7, 2, 8, 5, 10, 3}, {5, 8, 1, 0, 2, 4, 7, 6, 3, 9}, {3, 2, 7, 9, 0, 1, 10, 8, 6, 4}, {1, 4, 6, 5, 3, 0, 9, 7, 2, 8}, {10, 3, 4, 6, 9, 2, 0, 1, 7, 5}, {6, 7, 9, 1, 8, 3, 5, 0, 2, 10}, {8, 10, 5, 7, 4, 9, 2, 3, 0, 6}, {2, 9, 8, 3, 6, 5, 4, 10, 1, 0}};

  @Override
  public ApiResponse addOrder(OrderRequestDTO orderRequest, Long customerId, Long vendorId) {
    User customer = userRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer Not Found"));
    User vendor = userRepository.findById(vendorId).orElseThrow(() -> new ResourceNotFoundException("Vendor Not Found"));
    String vendorPincode = vendor.getAddresses().getFirst().getZipcode();
    Order orderPlaced = new Order();
    orderPlaced.setCustomer(customer);
    orderPlaced.setVendor(vendor);
    DeliveryBoy d = findSuitableDeliveryBoy(vendorPincode).orElseThrow(() -> new ResourceNotFoundException("No delivery boy found"));
    orderPlaced.setDeliveryBoy(d);
    d.setStatus(DeliveryStatus.BUSY); // delivery boy has become busy for ongoing delivery

    // orderPlaced.setDeliveryBoy(findSuitableDeliveryBoy()); // Implement suitable
    // logic and only AVAILABLE(logged i) db will be fetched
    // when suitable delivery boy found -> set status to BUSY
    orderPlaced.setDeliveryAddress(mapper.map(orderRequest.getAddress(), Address.class));
    orderPlaced.setStatus(OrderStatus.PLACED);
    orderRepository.save(orderPlaced);
    for (MenuDTO menuDTO : orderRequest.getMenuItems()) {
      Menu menu = menuRepository.findById(menuDTO.getId()).orElseThrow(() -> new ResourceNotFoundException("Menu not found with id " + menuDTO.getId()));

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
    payment.setPaymentMethod(PaymentMethod.valueOf(orderRequest.getPayment().getPaymentMethod()));
    payment.setOrder(orderPlaced);
    paymentRepository.save(payment);

    return new ApiResponse("Order placed successfully!");
  }

//	public Optional<DeliveryBoy> findSuitableDeliveryBoy(String vendorPincode) {
//		Optional<DeliveryBoy> minDistDeliveryBoy = Optional.empty();
//		List<String> reference = List.of("411057","411157", "411058", "411059", "411060", "411061", "411557", "411082",
//				"411997", "411050");
//		int[][] distMatrix = { { 0, 5, 2, 8, 3, 7, 1, 9, 4, 6 }, { 7, 0, 3, 10, 5, 8, 6, 2, 9, 1 },
//				{ 9, 6, 0, 4, 7, 2, 8, 5, 10, 3 }, { 5, 8, 1, 0, 2, 4, 7, 6, 3, 9 }, { 3, 2, 7, 9, 0, 1, 10, 8, 6, 4 },
//				{ 1, 4, 6, 5, 3, 0, 9, 7, 2, 8 }, { 10, 3, 4, 6, 9, 2, 0, 1, 7, 5 }, { 6, 7, 9, 1, 8, 3, 5, 0, 2, 10 },
//				{ 8, 10, 5, 7, 4, 9, 2, 3, 0, 6 }, { 2, 9, 8, 3, 6, 5, 4, 10, 1, 0 } };
//		List<DeliveryBoy> availableDeliveryBoys = deliveryBoyRepository.findByStatus(DeliveryStatus.AVAILABLE);
//		int vendorPincodeIndex = reference.indexOf(vendorPincode);
//		int deliveryBoyPincodeIndex;
//		int min = Integer.MAX_VALUE;
//		for (DeliveryBoy d : availableDeliveryBoys) {
//			deliveryBoyPincodeIndex = reference.indexOf(d.getCurrentPincode());
//			if (distMatrix[deliveryBoyPincodeIndex][vendorPincodeIndex] < min) {
//				min = distMatrix[deliveryBoyPincodeIndex][vendorPincodeIndex];
//				minDistDeliveryBoy = Optional.of(d);
//			}
//		}
//
//		return minDistDeliveryBoy;
//	}

  public Optional<DeliveryBoy> findSuitableDeliveryBoy(String vendorPincode) {


    int vendorPincodeIndex = reference.indexOf(vendorPincode);
    if (vendorPincodeIndex == -1) {
      throw new ResourceNotFoundException("Pincode " + vendorPincode + " is not supported.");
    }

    int min = Integer.MAX_VALUE;
    Optional<DeliveryBoy> minDistDeliveryBoy = Optional.empty();

    for (DeliveryBoy d : deliveryBoyRepository.findByStatus(DeliveryStatus.AVAILABLE)) {
      int deliveryBoyPincodeIndex = reference.indexOf(d.getCurrentPincode());
      if (deliveryBoyPincodeIndex == -1) {
        // Log the unsupported pincode for further investigation
        System.out.println("Unsupported pincode for delivery boy: " + d.getCurrentPincode());
        continue; // Skip delivery boys with unsupported pincodes
      }

      if (deliveryBoyPincodeIndex >= 0 && deliveryBoyPincodeIndex < distMatrix.length && vendorPincodeIndex >= 0 && vendorPincodeIndex < distMatrix[0].length) {
        int distance = distMatrix[deliveryBoyPincodeIndex][vendorPincodeIndex];
        if (distance < min) {
          min = distance;
          minDistDeliveryBoy = Optional.of(d);
        }
      } else {
        // Log if indices are out of bounds
        System.out.println("Out of bounds index for delivery boy's pincode: " + d.getCurrentPincode());
      }
    }

    return minDistDeliveryBoy;
  }


  @Override
  public ApiResponse changeStatus(Long orderId) {
    Order order = orderRepository.findById(orderId).orElseThrow(() -> new ResourceNotFoundException("Order Not Found"));
    order.setStatus(OrderStatus.DELIVERED);
    Address deliveryAddress = order.getDeliveryAddress();
    DeliveryBoy deliveryBoy = order.getDeliveryBoy();
    deliveryBoy.setCurrentPincode(deliveryAddress.getZipcode());
    deliveryBoy.setStatus(DeliveryStatus.AVAILABLE);
    return new ApiResponse("Order Status Changed to " + OrderStatus.DELIVERED);
  }

  @Override
  public ApiResponse addReview(Long orderId, Long customerId, ReviewDTO addReview) {
    User customer = userRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer Not Found"));
    Order order = orderRepository.findOrderByIdAndStatus(orderId, OrderStatus.DELIVERED).orElseThrow(() -> new ResourceNotFoundException("No order exist"));
    Review review = mapper.map(addReview, Review.class);
    review.setCustomer(customer);
    review.setOrder(order);
    review.setVendor(order.getVendor());
    reviewRepository.save(review);
    return new ApiResponse("Review Added for order id " + order.getId() + " by customer : " + customer.getFirstName());

  }

  @Override
  public List<OrderDetailsResDTO> getOrdersByVendorAndStatus(Long vendorId, OrderStatus status) {
    List<OrderDetailsResDTO> list = new ArrayList<>();
    User vendor = userRepository.findById(vendorId).orElseThrow(() -> new ResourceNotFoundException("Vendor not found!!"));

    List<Order> orders = orderRepository.findByVendor(vendor);

    for (Order order : orders) {
      if (order.getStatus().equals(status)) {

        OrderResDTO dto = new OrderResDTO();
        dto.setCustomer(mapper.map(order.getCustomer(), UserDTO.class));
        dto.setDeliveryBoy(mapper.map(order.getDeliveryBoy().getDeliveryBoy(), UserDTO.class));
        AddressReqDTO addressDto = mapper.map(order.getDeliveryAddress(), AddressReqDTO.class);
        dto.setDeliveryAddress(addressDto);

        OrderDetailsResDTO orderDetailsResDTO = new OrderDetailsResDTO();

        orderDetailsResDTO.setCustomerAndDeliveryDetails(dto);

        List<OrderMenuDetailsResDTO> menuItemsList = new ArrayList<>();
        List<OrderDetails> orderDetailsList = orderDetailsRepository.findByOrder(order);
        Double amount = 0.0;
        for (OrderDetails od : orderDetailsList) {
          Menu menu = od.getMenuItem();
          menuItemsList.add(new OrderMenuDetailsResDTO(menu.getName(), od.getQuantity(), menu.getPrice()));
          amount += od.getQuantity() * menu.getPrice();
        }
        orderDetailsResDTO.setMenuItems(menuItemsList);
        orderDetailsResDTO.setTotalAmount(amount);
        list.add(orderDetailsResDTO);
      }
    }
    return list;
  }

  @Override
  public List<OrderDelResDTO> getPlacedForDelivery(Long deliveryBoyId, OrderStatus status) {
    List<OrderDelResDTO> list = new ArrayList<>();
    User deliveryBoy = userRepository.findById(deliveryBoyId).orElseThrow(() -> new ResourceNotFoundException("Delivery Boy not found!!"));
    DeliveryBoy delivery_details = deliveryBoyRepository.findByDeliveryBoy(deliveryBoy).orElseThrow(() -> new ResourceNotFoundException("Delivery details not found!!"));

    List<Order> orders = orderRepository.findByDeliveryBoy(delivery_details);
    for (Order order : orders) {
      if (order.getStatus().equals(status)) {
        OrderDelResDTO dto = new OrderDelResDTO();
        dto.setCustomer(mapper.map(order.getCustomer(), UserDTO.class));
        dto.setVendor(mapper.map(order.getVendor(), UserDTO.class));
        AddressReqDTO addressDto = mapper.map(order.getDeliveryAddress(), AddressReqDTO.class);
        dto.setDeliveryAddress(addressDto);
        dto.setOrderId(order.getId());
        Payment earnedAmount = paymentRepository.findByOrder(order).orElseThrow(() -> new ResourceNotFoundException("Order not found"));
        dto.setPaymentMethod(earnedAmount.getPaymentMethod());
        System.out.println(order.getDeliveryAddress().getZipcode());
        System.out.println(order.getVendor().getAddresses().getFirst().getZipcode());
        int deliveryDistance = deliveryDistanceBetweenVendorAndCust(order.getDeliveryAddress().getZipcode(), order.getVendor().getAddresses().getFirst().getZipcode());
        dto.setEarnedAmount(deliveryDistance * 0.2);
        list.add(dto);
      }
    }
    return list;
  }

  public int deliveryDistanceBetweenVendorAndCust(String vendorPincode, String customerPincode) {
    int vendorPincodeIndex = reference.indexOf(vendorPincode);
    int customerPincodeIndex = reference.indexOf(customerPincode);
    return distMatrix[customerPincodeIndex][vendorPincodeIndex];
  }
//	@Override
//	public List<OrderResDTO> getOrdersByVendorAndStatus(Long vendorId, OrderStatus status) {
//		User vendor = userRepository.findById(vendorId)
//				.orElseThrow(() -> new ResourceNotFoundException("Vendor not found"));
//
//		List<Order> orders = orderRepository.findByVendorAndStatus(vendor, status);
//
//		return orders.stream().map(order -> {
//			OrderResDTO dto = new OrderResDTO();
//			dto.setCustomer(mapper.map(order.getCustomer(), UserDTO.class));
//			dto.setDeliveryBoy(mapper.map(order.getDeliveryBoy().getDeliveryBoy(), UserDTO.class));
//			AddressReqDTO addressDto = mapper.map(order.getDeliveryAddress(), AddressReqDTO.class);
//			dto.setDeliveryAddress(addressDto);
//			return dto;
//		}).collect(Collectors.toList());
//	}

  @Override
  public List<CustomerOrderHistoryResDTO> getCustomerOrderHistory() {
	  System.out.println(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
      User user = userRepository.findByEmail(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())
                                .orElseThrow(() -> new ResourceNotFoundException("No user found"));
      System.out.println("user : "+user);
      return orderRepository.findAllDeliveredOrder(user, OrderStatus.DELIVERED).stream()
          .flatMap(order -> {
              // Get vendor business name
              User vendor = userRepository.findById(order.getVendor().getId())
                                          .orElseThrow(() -> new ResourceNotFoundException("Vendor Not Found"));
              String vendorBusinessName = vendor.getBusinessName();
              System.out.println("Order :- " + order);

              // Get order details
              List<CustomerOrderHistoryResDTO> orderHistoryList = orderDetailsRepository.findByOrder(order).stream()
                  .map(orderDetail -> {
                      Menu menu = menuRepository.findById(orderDetail.getMenuItem().getId())
                                               .orElseThrow(() -> new ResourceNotFoundException("Menu Not Found"));
                      String menuName = menu.getName();
                      int quantity = orderDetail.getQuantity();

                      // Get payment details
                      Payment payment = paymentRepository.findByOrder(order)
                                                        .orElseThrow(() -> new ResourceNotFoundException("Payment Not Found"));
                      double totalAmount = payment.getAmount();

                      return new CustomerOrderHistoryResDTO(order.getId(),vendorBusinessName, menuName, quantity, totalAmount);
                  })
                  .collect(Collectors.toList());

              return orderHistoryList.stream();
          })
          .collect(Collectors.toList());
  }


// order delivered)
  // change order status to DELIVERED
  // change delivery boy status to AVAILABLE + set new pincode as
  // order->deliveryaddress->'s pincode
}
