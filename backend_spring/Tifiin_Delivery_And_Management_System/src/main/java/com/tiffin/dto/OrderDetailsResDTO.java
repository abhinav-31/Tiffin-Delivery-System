package com.tiffin.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailsResDTO {
  private List<OrderMenuDetailsResDTO> menuItems;
  private Double totalAmount;
  private OrderResDTO customerAndDeliveryDetails;
}
