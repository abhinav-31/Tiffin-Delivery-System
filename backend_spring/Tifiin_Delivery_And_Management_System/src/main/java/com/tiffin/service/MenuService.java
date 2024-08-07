package com.tiffin.service;

import com.tiffin.dto.MenuReqDTO;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface MenuService {
    MenuReqDTO addMenu(MenuReqDTO menuDTO, Long vendorId, MultipartFile image) throws IOException;
    MenuReqDTO updateMenu(Long id, MenuReqDTO menuDTO);
    void deleteMenu(Long id);
    List<MenuReqDTO> getAllMenus();
    MenuReqDTO getMenuById(Long id);
}
