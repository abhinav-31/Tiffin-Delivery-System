package com.tiffin.controllers;

import com.tiffin.entities.Role;
import com.tiffin.entities.User;
import com.tiffin.service.UserService;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController

@NoArgsConstructor
@AllArgsConstructor
public class UserController {
    @Autowired
    private UserService userService;
    
    @GetMapping
    
    public List<User> initializeData() {
       List<User> users = userService.getAllUsers();

        return users;
    }
}
