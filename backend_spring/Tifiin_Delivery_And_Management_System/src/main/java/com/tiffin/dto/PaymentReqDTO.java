package com.tiffin.dto;

import com.tiffin.enums.PaymentMethod;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PaymentReqDTO {
	private String paymentMethod;
    private Double amount;
    private String transactionId;
}
