package com.tiffin.dto;

import java.util.List;
import jakarta.validation.Valid;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderRequestDTO {
    @Valid
    private List<MenuDTO> menuItems;
    
    @Valid
    private AddressReqDTO address;
}
