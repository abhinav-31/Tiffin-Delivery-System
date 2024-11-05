package com.tiffin.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.tiffin.custom_exceptions.ResourceNotFoundException;
import com.tiffin.dto.ApiResponse;
import com.tiffin.dto.ReviewReqDTO;
import com.tiffin.dto.ReviewResponseDTO;
import com.tiffin.entities.Order;
import com.tiffin.entities.Review;
import com.tiffin.entities.User;
import com.tiffin.enums.OrderStatus;
import com.tiffin.repository.OrderRepository;
import com.tiffin.repository.ReviewRepository;
import com.tiffin.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {
	
	@Autowired
	private ReviewRepository reviewRepository;
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private OrderRepository orderRepository;
	@Autowired
	private ModelMapper mapper;
	
	@Override
	public List<ReviewResponseDTO> getReviews() {
	    return reviewRepository.findAll().stream()
	        .map(review -> {
	            ReviewResponseDTO dto = new ReviewResponseDTO();
	            dto.setOrderId(review.getOrder().getId());
	            dto.setCustomerName(review.getCustomer().getFirstName());
	            dto.setVendorName(review.getVendor().getBusinessName());
	            dto.setReviewMessage(review.getComment());
	            dto.setRating(review.getRating());
	            return dto;
	        })
	        .collect(Collectors.toList());
	}
	@Override
	public ApiResponse addReview(Long orderId, ReviewReqDTO addReview) {
		User customer = userRepository
				.findByEmail(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString())
				.orElseThrow(() -> new ResourceNotFoundException("no user found"));
		Order order = orderRepository.findOrderByIdAndStatus(orderId, OrderStatus.DELIVERED)
				.orElseThrow(() -> new ResourceNotFoundException("No order exist"));
		Review review = mapper.map(addReview, Review.class);
		review.setCustomer(customer);
		review.setOrder(order);
		review.setVendor(order.getVendor());
		reviewRepository.save(review);
		return new ApiResponse("Review Added Successfully");

	}


}
