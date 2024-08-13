package com.tiffin.dto;
import com.tiffin.entities.Payment;
import com.tiffin.enums.PaymentMethod;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OrderDelResDTO {
    private UserDTO customer;
    private UserDTO vendor;
    private AddressReqDTO deliveryAddress;
    private Double earnedAmount;
    private Long orderId;
    private PaymentMethod paymentMethod;
}