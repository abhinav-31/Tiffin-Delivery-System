package com.tiffin.entities;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.HashSet;
import java.util.Set;

import com.tiffin.enums.OrderStatus;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Order extends BaseEntity {

    @ManyToOne
    @NotNull
    private User customer; // The customer who placed the order

    @ManyToOne
    @NotNull
    private User vendor; // The vendor fulfilling the order

    @OneToOne // Each order can have one delivery boy
    private DeliveryBoy deliveryBoy; // The delivery boy assigned to the order

    @OneToMany(mappedBy = "order")
    private Set<OrderDetails> orderDetails = new HashSet<>();

    @Enumerated(EnumType.STRING)
    @NotNull
    private OrderStatus status; // e.g., PLACED, DELIVERED

    @OneToOne(mappedBy = "order")
    private Payment payment; // Payment details for the order

    @Embedded
    @Valid
    private Address deliveryAddress; // Delivery address for the order
}
