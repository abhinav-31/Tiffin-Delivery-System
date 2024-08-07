package com.tiffin.dto;
import com.tiffin.entities.Address;
import com.tiffin.entities.User;
import com.tiffin.enums.OrderStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OrderResDTO {
    private User customer;
    private User deliveryBoy;
    private Address deliveryAddress;
}