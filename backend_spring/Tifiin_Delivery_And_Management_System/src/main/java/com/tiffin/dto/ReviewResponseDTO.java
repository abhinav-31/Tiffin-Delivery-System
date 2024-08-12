package com.tiffin.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReviewResponseDTO {
	private Long orderId;
	private String customerName;
	private String vendorName;
	private String reviewMessage;
	private double rating;
}
