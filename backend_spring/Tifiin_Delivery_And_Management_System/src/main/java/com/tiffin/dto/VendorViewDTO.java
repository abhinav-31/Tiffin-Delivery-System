package com.tiffin.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VendorViewDTO {
	private String email;
	private String businessName;
	private double rating;
	private byte[] vendorBusinessImage;
}