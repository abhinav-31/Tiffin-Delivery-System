package com.tiffin.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.tiffin.dto.ApiResponse;
import com.tiffin.dto.ReviewReqDTO;
import com.tiffin.dto.ReviewResponseDTO;

import jakarta.transaction.Transactional;


public interface ReviewService {
	List<ReviewResponseDTO> getReviews();

	ApiResponse addReview(Long orderId, ReviewReqDTO addReview);
}
