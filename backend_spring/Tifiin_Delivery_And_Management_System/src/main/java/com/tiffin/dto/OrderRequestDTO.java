package com.tiffin.dto;

import java.util.List;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderRequestDTO {
    
    private List<MenuDTO> menuItems;
    
   
    private AddressReqDTO address;
}
