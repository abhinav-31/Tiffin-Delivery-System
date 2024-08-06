package com.tiffin.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.tiffin.enums.Role;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {
	@Column(length = 20, nullable = false)

	private String firstname;
	@Column(length = 20)
	private String lastname;

	@Column(length = 30, unique = true, nullable = false)
	private String email;

	@Column(length = 100, unique = true, nullable = false)
	private String password;

	@Enumerated(EnumType.STRING)

	@Column(nullable = false)
	private Role role;

	@Column(length = 20)
	private String businessName;

	@ElementCollection(fetch = FetchType.LAZY)
	@CollectionTable(name = "user_addresses", joinColumns = @JoinColumn(name = "user_id"))
	private List<Address> addresses = new ArrayList<>();
}
