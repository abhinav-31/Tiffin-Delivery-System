package com.tiffin.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tiffin.dto.ReviewResponseDTO;
import com.tiffin.entities.Review;
import com.tiffin.entities.User;
import com.tiffin.repository.ReviewRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {
	
	@Autowired
	private ReviewRepository reviewRepository;
	
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



}
