package com.tiffin.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MenuDTO {

    private Long id;
//    @NotBlank(message = "Quantity must be supplied")
    private int quantity;
    private int price;

}
