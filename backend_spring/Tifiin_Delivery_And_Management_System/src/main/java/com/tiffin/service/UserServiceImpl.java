package com.tiffin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.tiffin.entities.User;
import com.tiffin.repository.UserRepository;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public class UserServiceImpl implements UserService{
	@Autowired
    private UserRepository userRepository;
	@Override
    public void saveUser(User user) {
        userRepository.save(user);
    }
	@Override
	public List<User> getAllUsers() {
		return userRepository.findAll();
		
	}
}
