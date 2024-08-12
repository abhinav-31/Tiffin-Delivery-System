package com.tiffin.dto;
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
}