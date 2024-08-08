package com.tiffin.dto;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderRequestDTO {
    
    private List<MenuDTO> menuItems;
    private AddressReqDTO address;
    private PaymentReqDTO payment;
    
}
