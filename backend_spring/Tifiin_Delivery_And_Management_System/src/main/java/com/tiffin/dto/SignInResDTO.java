package com.tiffin.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SignInResDTO {
	private String jwt;
	private String message;
	private String role;
	private String email;
	private String name;
	private Long id;
}
