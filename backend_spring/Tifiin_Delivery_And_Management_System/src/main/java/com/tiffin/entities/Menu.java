package com.tiffin.entities;

import java.util.Set;

import com.tiffin.enums.MenuCategory;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "menus")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Menu extends BaseEntity {

	@Column(length = 30)
	private String name; // Name of the menu item

	private String description; // Description of the menu item
	private Double price; // Price of the menu item

	@Enumerated(EnumType.STRING)

	@Column(length = 15)
	private MenuCategory category; // Category of the menu item

	private Integer quantity; // Quantity available for the menu item

	@ManyToOne
	@NotNull
	private User vendor; // The vendor who offers this menu item

	@Lob
	@Column(columnDefinition = "LongBlob")// => large object , col type : longblob
	private byte[] menuImage;
	
	@OneToMany(mappedBy = "menuItem")
	private Set<OrderDetails> orderDetails; // Links to OrderDetails to track quantities in orders

	public void addOrderDetails(OrderDetails addOd) {
//    	OrderDetails addOd = new OrderDetails();
		addOd.setMenuItem(this);
		orderDetails.add(addOd);
	}
}
