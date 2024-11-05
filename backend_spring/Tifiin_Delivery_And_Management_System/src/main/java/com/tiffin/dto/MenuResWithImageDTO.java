package com.tiffin.dto;

import com.tiffin.enums.MenuCategory;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MenuResWithImageDTO {
    private Long id;
    private String name;
    private String description;
    private Double price;
    private MenuCategory category;
    private Integer quantity;
    private byte[] menuImage;
    private String vendorZipcode;
}
