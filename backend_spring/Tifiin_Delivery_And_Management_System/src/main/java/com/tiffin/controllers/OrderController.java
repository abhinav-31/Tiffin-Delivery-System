package com.tiffin.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.tiffin.dto.OrderRequestDTO;
import com.tiffin.dto.ReviewDTO;
import com.tiffin.enums.PaymentMethod;
import com.tiffin.service.OrderService;

@RestController
@CrossOrigin
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/{customerId}/{vendorId}")
    public ResponseEntity<?> addOrder(@RequestParam PaymentMethod paymentMethod,@RequestBody  OrderRequestDTO orderRequest ,@PathVariable Long customerId,
            @PathVariable Long vendorId) {

        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.addOrder(paymentMethod, orderRequest, customerId, vendorId));
    }
    
    
    // Changing Order Status To Delivered
    @PutMapping("/{orderId}")
    public ResponseEntity<?> changeOrderStatus(@PathVariable Long orderId){
    	return ResponseEntity.status(HttpStatus.CREATED).body(orderService.changeStatus(orderId));
    }
    
    
   // Order has review
   // Review Placed by customer for order and vendor
    @PostMapping("/addReview/{orderId}/{customerId}")
    public ResponseEntity<?> addReviewByCutomer(@PathVariable Long orderId,@PathVariable Long customerId, @RequestBody ReviewDTO review){
    	return ResponseEntity.status(HttpStatus.CREATED).body(orderService.addReview(orderId,customerId, review));
    }
    
    // one Order has one payment done by customer
}
