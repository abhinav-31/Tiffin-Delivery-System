package com.tiffin.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddressResDTO {
	    private String adrLine1;

	    private String adrLine2;

	    private String city;

	    private String state;

	    private String country;

	    @Size(min = 6, max = 6, message = "ZipCode must have 6 digits")
	    private String zipcode;

	    private String phoneNo;

}
