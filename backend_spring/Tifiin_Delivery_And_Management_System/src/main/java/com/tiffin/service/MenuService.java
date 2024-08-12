package com.tiffin.service;

import com.tiffin.dto.MenuReqDTO;
import com.tiffin.dto.MenuResWithImageDTO;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface MenuService {
    MenuReqDTO addMenu(MenuReqDTO menuDTO, Long vendorId, MultipartFile image) throws IOException;
    MenuReqDTO updateMenu(Long id, MenuReqDTO menuDTO);
    void deleteMenu(Long id);
    List<MenuResWithImageDTO> getAllMenus();
    MenuResWithImageDTO getMenuById(Long id);
    List<MenuResWithImageDTO> getMenuByVendorId(Long vendorId);
}
