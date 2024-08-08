package com.tiffin.dto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OrderResDTO {
    private UserDTO customer;
    private UserDTO deliveryBoy;
    private AddressReqDTO deliveryAddress;
}