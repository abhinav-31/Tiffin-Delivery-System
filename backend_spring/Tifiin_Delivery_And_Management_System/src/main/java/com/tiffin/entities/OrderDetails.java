package com.tiffin.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "order_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetails extends BaseEntity {

    @ManyToOne
    private Menu menuItem; // The menu item ordered

    @ManyToOne
    @NotNull
    private Order order; // The order this detail is associated with

    @NotNull
    private Integer quantity; // Quantity of the menu item in the order
//    @NotNull
//    private Double price; // Price of the menu item in the order
}
