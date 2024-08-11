package com.tiffin.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import com.tiffin.enums.Role;

import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserSignUpReqDTO {
	
//		@JsonProperty(access = Access.READ_ONLY) // this property only used during ser.
//		private Long id;
		@NotBlank(message = "First Name required")
		private String firstName;
		private String lastName;
		@Email(message = "Invalid Email!!!")
		private String email;
		@JsonProperty(access = Access.WRITE_ONLY)
		private String password;
		@Enumerated
		private Role role;
//		public CustomerSignUpReqDTO(String firstName, String lastName,
//				String email, String password) {
//			super();
//			this.firstName = firstName;
//			this.lastName = lastName;
//			this.email = email;
//			this.password = password;
//			this.role = Role.ROLE_CUSTOMER;
//		}
}
