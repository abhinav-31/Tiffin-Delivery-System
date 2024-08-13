package com.tiffin.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tiffin.dto.OrderRequestDTO;
import com.tiffin.dto.ReviewDTO;
import com.tiffin.enums.OrderStatus;
import com.tiffin.enums.PaymentMethod;
import com.tiffin.service.OrderService;
import jakarta.validation.Valid;

@RestController
//@CrossOrigin
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/orders")
public class OrderController {

  @Autowired
  private OrderService orderService;

  @PostMapping("/{customerId}/{vendorId}")
  public ResponseEntity<?> addOrder(@RequestBody @Valid OrderRequestDTO orderRequest, @PathVariable Long customerId,
                                    @PathVariable Long vendorId) {
    return ResponseEntity.status(HttpStatus.CREATED)
            .body(orderService.addOrder( orderRequest, customerId, vendorId));
  }

  @PostMapping("/addReview/{orderId}/{customerId}")
  public ResponseEntity<?> addReviewByCustomer(@PathVariable Long orderId, @PathVariable Long customerId, @RequestBody ReviewDTO review) {
    return ResponseEntity.status(HttpStatus.CREATED).body(orderService.addReview(orderId, customerId, review));
  }

  @GetMapping("/{vendorId}")
  public ResponseEntity<?> getOrdersByStatus(@RequestParam OrderStatus status, @PathVariable Long vendorId) {
    return ResponseEntity.status(HttpStatus.OK).body(orderService.getOrdersByVendorAndStatus(vendorId, status));
  }

  @PutMapping("/changeStatus/{orderId}")
  public ResponseEntity<?> changeOrderStatus(@PathVariable Long orderId) {
    return ResponseEntity.status(HttpStatus.CREATED).body(orderService.changeStatus(orderId));
  }

  @GetMapping("/deliveryBoy/{deliveryBoyId}")
  public ResponseEntity<?> getPlacedForDelivery(@RequestParam OrderStatus status, @PathVariable Long deliveryBoyId) {
    return ResponseEntity.status(HttpStatus.OK).body(orderService.getPlacedForDelivery(deliveryBoyId, status));
  }

  @GetMapping("/deliveryCharges/{customerPincode}/{vendorPincode}")
  public ResponseEntity<?> getDeliveryCharges(@RequestParam String customerPincode, @RequestParam String vendorPincode) {
    return ResponseEntity.status(HttpStatus.OK).body(orderService.deliveryDistanceBetweenVendorAndCust(customerPincode, vendorPincode));
  }

}
