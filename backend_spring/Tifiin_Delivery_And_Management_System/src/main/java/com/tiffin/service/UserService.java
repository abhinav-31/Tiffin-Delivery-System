package com.tiffin.service;

import java.util.List;

import com.tiffin.entities.User;

public interface UserService {
	public void saveUser(User user);

	public List<User> getAllUsers();
}
