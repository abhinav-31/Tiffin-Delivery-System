package com.tiffin.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.persistence.Column;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Table(name = "pincodes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pincode extends BaseEntity {
 
    @Column(unique = true, nullable = false)
    @NotNull
    @Size(min = 6, max = 6, message = "ZipCode must have 6 digits")
    private String zipCode;

    // Single fixed value for distance calculations
    private Integer fixedValue; // Example: a fixed integer value to represent the pincode location
}
