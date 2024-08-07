package com.tiffin.entities;

import com.tiffin.enums.DeliveryStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.persistence.OneToOne;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "delivery_boys")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DeliveryBoy extends BaseEntity {

	@OneToOne
	@JoinColumn(name = "delivery_id")
	@NotNull
	private User deliveryBoy;

	@Enumerated(EnumType.STRING)
	@NotNull
	@Column(length = 10)
	private DeliveryStatus status;

	@NotNull
	@Size(min = 6, max = 6, message = "ZipCode must have 6 digits")
	private String currentPincode;

}
