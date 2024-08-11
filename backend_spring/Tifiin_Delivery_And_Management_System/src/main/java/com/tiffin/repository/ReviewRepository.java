package com.tiffin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tiffin.entities.Review;
import com.tiffin.entities.User;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
	
	List<Review> findByVendor(User vendor);

}
