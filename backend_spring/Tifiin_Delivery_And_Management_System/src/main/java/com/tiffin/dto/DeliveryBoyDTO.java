package com.tiffin.dto;

import com.tiffin.enums.DeliveryStatus;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DeliveryBoyDTO {
    @NotNull
    private Long deliveryBoyId;
    @NotNull
    private DeliveryStatus status;
    @NotNull
    @Size(min = 6, max = 6, message = "ZipCode must have 6 digits")
    private String currentPincode;
    
    @Valid
    private AddressReqDTO address;

    
}
