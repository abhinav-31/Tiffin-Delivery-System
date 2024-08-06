package com.tiffin.entities;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "menu")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Menu extends BaseEntity {
	private String menuName;
	private String description;
	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private Category category;

	@Enumerated(EnumType.STRING)
	@Column(length = 20)
	private MenuType menuType;

	@OneToMany(mappedBy = "menuItem")
	private Set<MenuOrder> orderDetails = new HashSet<>();
	@ManyToOne
	@JoinColumn(name = "vendor_id")
	private User vendor;

	private int quantity;

	private Double price;
}
