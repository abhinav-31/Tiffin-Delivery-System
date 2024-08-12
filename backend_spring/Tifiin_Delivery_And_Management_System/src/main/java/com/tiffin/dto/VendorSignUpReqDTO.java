package com.tiffin.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class VendorSignUpReqDTO {
	
//		@JsonProperty(access = Access.READ_ONLY) // this property only used during ser.
//		private Long id;
		@NotBlank(message = "First Name required")
		private String firstName;
		private String lastName;
		@Email(message = "Invalid Email!!!")
		private String email;
		@JsonProperty(access = Access.WRITE_ONLY)
		private String password;
		private String businessName;}
