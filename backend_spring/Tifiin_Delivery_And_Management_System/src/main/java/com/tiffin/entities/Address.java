package com.tiffin.entities;
import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Table(name="address")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Address {
	@Column(name="adr_line1",length=100)
	private String adrLine1;
	@Column(name="adr_line2",length=100)
	private String adrLine2;
	@Column(length=20)
	private String city;
	@Column(length=20)
	private String state;
	@Column(length=20)
	private String country;
	@Column(length=20,name="zip_code")
	private String zipCode;
	@Column(name="phone_no",unique = true)
	private String phoneNo;
	
		
}
