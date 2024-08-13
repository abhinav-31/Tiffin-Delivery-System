package com.tiffin.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderMenuDetailsResDTO {
  private String menuItemName;
  private Integer quantity;
  private Double price;
}
