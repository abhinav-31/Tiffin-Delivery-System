package com.tiffin.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tiffin.dto.VendorViewDTO;
import com.tiffin.entities.Review;
import com.tiffin.entities.User;
import com.tiffin.enums.Role;
import com.tiffin.repository.ReviewRepository;
import com.tiffin.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ViewVendorServiceImpl implements ViewVendorService {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private ReviewRepository reviewRepository;

	@Override
	public List<VendorViewDTO> findAllVendors() {
		return userRepository.findAllVendors(Role.ROLE_VENDOR).stream().map(vendor -> {
			List<Review> reviews = reviewRepository.findByVendor(vendor);
			double avgRating = reviews.stream().mapToDouble(Review::getRating).average().orElse(0.0);
			// Round the average rating to one decimal place
			avgRating = Math.round(avgRating * 10.0) / 10.0;
			return new VendorViewDTO(vendor.getEmail(), vendor.getBusinessName(), avgRating, vendor.getUserImage());
		}).collect(Collectors.toList());
	}

}
