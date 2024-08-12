package com.tiffin.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryBoySignUpReqDTO {
  private UserSignUpReqDTO userSignUpReqDTO;
  private AddressReqDTO addressReqDTO;
}

