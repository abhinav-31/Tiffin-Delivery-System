package com.tiffin.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Embeddable
@Getter
@Setter
@ToString
public class Address {

    @NotBlank(message = "Address Line 1 cannot be blank")
    private String adrLine1;

    private String adrLine2;

    @NotBlank(message = "City cannot be blank")
    @Column(length = 10)
    private String city;

    @NotBlank(message = "State cannot be blank")
    @Column(length = 25)
    private String state;

    @NotBlank(message = "Country cannot be blank")
    @Column(length = 10)
    private String country;

    @NotBlank(message = "Zipcode cannot be blank")
    @Size(min = 6, max = 6, message = "ZipCode must have 6 digits")
    private String zipcode;

    @Pattern(regexp = "^\\+?[0-9]*$", message = "Phone number can only contain digits and optional leading '+'")
    @Column(length = 11)
    private String phoneNo;

    @Column(length = 20)
    private String contactperson;

    private Boolean isPrimary;
}
