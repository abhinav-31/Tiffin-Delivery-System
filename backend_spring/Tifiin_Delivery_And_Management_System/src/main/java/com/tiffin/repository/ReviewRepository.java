package com.tiffin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tiffin.entities.Review;
@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

}
