package com.tiffin.service;

import com.tiffin.dto.UserDTO;
import com.tiffin.custom_exceptions.ResourceNotFoundException;
import com.tiffin.entities.User;
import com.tiffin.enums.Role;
import com.tiffin.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper mapper;

    @Override
    public List<UserDTO> getUsersByRole(Role role) {
        return Optional.ofNullable(userRepository.findByRole(role))
                       .filter(userList -> !userList.isEmpty())
                       .map(userList -> userList.stream()
                                                .map(user -> mapper.map(user, UserDTO.class))
                                                .collect(Collectors.toList()))
                       .orElseThrow(() -> new ResourceNotFoundException("No users found for the role: " + role));
    }
}
