package com.tiffin.service;

import com.tiffin.dto.UserDTO;
import com.tiffin.enums.Role;

import java.util.List;

public interface AdminService {
    List<UserDTO> getUsersByRole(Role role);
}
