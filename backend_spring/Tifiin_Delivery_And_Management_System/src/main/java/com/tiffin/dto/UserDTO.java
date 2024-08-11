package com.tiffin.dto;

import com.tiffin.enums.Role;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class UserDTO {
	private String firstName;
	private String lastName;
	private String email;
	private String contactNo;
//	@Enumerated(EnumType.STRING)
	private Role role;
	private String businessName;

}
