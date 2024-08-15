package com.tiffin.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CustomerOrderHisResDTO {
	private Long id; // order id
	private String vendorBusinessName; 
	private String menuName;
	private int quantity; // ordered quantity
	private double totalAmount; // payment table
}
