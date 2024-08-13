package com.tiffin.service;

import com.tiffin.dto.ApiResponse;
import com.tiffin.dto.MenuDTO;
import com.tiffin.dto.MenuReqDTO;
import com.tiffin.dto.MenuResWithImageDTO;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

public interface MenuService {
    MenuReqDTO addMenu(MenuReqDTO menuDTO, Long vendorId, MultipartFile image) throws IOException;
    ApiResponse updateMenuQuantity(MenuDTO menuDTO);
    MenuReqDTO updateMenu(Long id, MenuReqDTO menuDTO);
    ApiResponse deleteMenu(MenuDTO menuDTO);
    List<MenuResWithImageDTO> getAllMenusOfVendor(Long vendorId);
    MenuResWithImageDTO getMenuById(Long id);
    List<MenuResWithImageDTO> getMenuByVendorId(Long vendorId);
}
