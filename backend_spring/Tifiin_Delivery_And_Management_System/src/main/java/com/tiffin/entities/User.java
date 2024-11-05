package com.tiffin.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;

import com.tiffin.enums.Role;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class User extends BaseEntity {
	@Column(length = 20, nullable = false)

	private String firstName;
	@Column(length = 20)
	private String lastName;

	@Column(length = 30, unique = true, nullable = false)
	private String email;

	@Column(length = 100, nullable = false)
	private String password;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Role role;

	@Column(length = 20)
	private String businessName;
	
	@Lob
	@Column(columnDefinition = "LongBlob")// => large object , col type : longblob
	private byte[] userImage;

	@ElementCollection(fetch = FetchType.LAZY)
	@CollectionTable(name = "user_addresses", joinColumns = @JoinColumn(name = "user_id"))
	private List<Address> addresses = new ArrayList<>();
	
	public void addAddress(Address address) {
		addresses.add(address);
	}
	
}
