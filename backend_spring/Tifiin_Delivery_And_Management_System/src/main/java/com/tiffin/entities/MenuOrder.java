package com.tiffin.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="menu_order")
public class MenuOrder extends BaseEntity {
	@ManyToOne
	private Order order;
	
	@ManyToOne 
	private Menu menuItem;
	
	private int quantity;
}
