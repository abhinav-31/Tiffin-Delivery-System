package com.tiffin.entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User extends BaseEntity {

	@Column(name = "first_name", length = 25) // col name , varchar(25)
	private String firstName;
	@Column(name = "last_name", length = 25) // col name , varchar(25)
	private String lastName;
	@Column(length = 20, unique = true) // varchar(20), unique constraint
	private String email;
	@Column(length = 25, nullable = false) // NOT NULL
	private String password;

	private int isStatus;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "role")
	private Role role;

	@Column(name = "business_name", length = 30, unique = true) // varchar(30), unique constraint
	private String businessName;
	@ElementCollection
	@CollectionTable(name = "address", joinColumns = @JoinColumn(name = "user_id"))
	private List<Address> address = new ArrayList<>();

	public void addAddress(Address addr) {
		this.address.add(addr);

	}
}
