package com.tiffin.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserSignInReqDTO {
	@NotBlank(message = "Email can't be blank")
	@Email(message = "Invalid Email!")
	@NotEmpty
	private String email;
	@JsonProperty(access = Access.WRITE_ONLY)
    private String password;
}
