package com.tiffin.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.Set;

import com.tiffin.enums.MenuCategory;

@Entity
@Table(name = "menus")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Menu extends BaseEntity {
	@NotBlank
	@Column(length = 30)
    private String name; // Name of the menu item
	@NotBlank
    private String description; // Description of the menu item
    private Double price; // Price of the menu item

    @Enumerated(EnumType.STRING)
    @NotBlank
    @Column(length = 15)
    private MenuCategory category; // Category of the menu item
    @NotBlank
    private Integer quantity; // Quantity available for the menu item

    @ManyToOne
    @NotNull
    private User vendor; // The vendor who offers this menu item

    @OneToMany(mappedBy = "menuItem")
    private Set<OrderDetails> orderDetails; // Links to OrderDetails to track quantities in orders
}
