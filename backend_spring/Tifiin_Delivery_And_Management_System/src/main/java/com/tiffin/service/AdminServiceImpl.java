package com.tiffin.service;

import com.tiffin.dto.AddressReqDTO;
import com.tiffin.dto.UserDTO;
import com.tiffin.custom_exceptions.ResourceNotFoundException;
import com.tiffin.entities.User;
import com.tiffin.enums.Role;
import com.tiffin.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
		List<User> userList = userRepository.findByRoleWithAddresses(role);

		if (userList == null || userList.isEmpty()) {
			throw new ResourceNotFoundException("No users found for the role: " + role);
		}

		List<UserDTO> userDTOList = new ArrayList<>();

		for (User user : userList) {
			UserDTO userDTO = mapper.map(user, UserDTO.class);
			if (user.getAddresses() != null && !user.getAddresses().isEmpty()) {
				userDTO.setContactNo(user.getAddresses().get(0).getPhoneNo());
			}
			userDTOList.add(userDTO);
		}

		return userDTOList;
	}

}
