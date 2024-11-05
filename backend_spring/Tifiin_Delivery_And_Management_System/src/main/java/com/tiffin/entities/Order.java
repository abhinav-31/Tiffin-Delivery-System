package com.tiffin.entities;

import java.util.HashSet;
import java.util.Set;

import com.tiffin.enums.OrderStatus;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Order extends BaseEntity {

	@ManyToOne
	@NotNull
	private User customer; // The customer who placed the order

	@ManyToOne
	@NotNull
	private User vendor; // The vendor fulfilling the order

	@ManyToOne // Each order can have one delivery boy
	private DeliveryBoy deliveryBoy; // The delivery boy assigned to the order

	@OneToMany(mappedBy = "order")
	private Set<OrderDetails> orderDetails = new HashSet<>();

	@Enumerated(EnumType.STRING)
	private OrderStatus status; // e.g., PLACED, DELIVERED
	
	@OneToOne(mappedBy = "order")
	private Payment payment; // Payment details for the order

	@Embedded
	private Address deliveryAddress; // Delivery address for the order

	// helper method
	public void addOrderDetails(OrderDetails addOd) {
//    	OrderDetails addOd = new OrderDetails();
		addOd.setOrder(this);
		orderDetails.add(addOd);
	}

	public Order(@NotNull User customer, @NotNull User vendor, DeliveryBoy deliveryBoy, @NotNull OrderStatus status,
			Payment payment, @Valid Address deliveryAddress) {
		super();
		this.customer = customer;
		this.vendor = vendor;
		this.deliveryBoy = deliveryBoy;
		this.status = status;
		this.deliveryAddress = deliveryAddress;
	}

}
