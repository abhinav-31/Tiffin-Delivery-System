package com.tiffin.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;

@Entity
public class DeliveryPartner {
	@Id
	private Long id;

	@OneToOne
	@JoinColumn(name = "delivery_boy_id")
	@MapsId
	private User deliveryBoy;
	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private DeliveryBoyStatus status;
	
	@Column(length=20,name="current_pin_code")
	private String currentPinCode;
	
}
