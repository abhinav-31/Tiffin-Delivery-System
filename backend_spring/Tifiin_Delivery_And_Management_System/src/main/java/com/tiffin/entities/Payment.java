package com.tiffin.entities;

import com.tiffin.enums.PaymentMethod;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "payments")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Payment extends BaseEntity {
	
	@Enumerated(EnumType.STRING)
    private PaymentMethod paymentMethod;
    private Double amount;
    @Column(length = 20)
    private String transactionId;

    @OneToOne
    private Order order;
}
