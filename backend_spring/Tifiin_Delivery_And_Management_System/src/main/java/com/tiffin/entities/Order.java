package com.tiffin.entities;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order extends BaseEntity {
	@ManyToOne
	private User customer;
	@ManyToOne
	private User vendor;
	
	@OneToOne
	@JoinColumn(name="delivery_boy_id")
	private User deliveryBoy;
	@OneToMany(mappedBy = "order")
	private Set<MenuOrder> orderDetails = new HashSet<>();
	
	@Embedded
	private Address deliveryAddress;
	private int isPlaced;
	private Double totalAmount;
}
