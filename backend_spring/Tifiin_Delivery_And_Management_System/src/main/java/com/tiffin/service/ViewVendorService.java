package com.tiffin.service;

import java.util.List;

import com.tiffin.dto.MenuResWithImageDTO;
import com.tiffin.dto.VendorViewDTO;

public interface ViewVendorService {

	List<VendorViewDTO> findAllVendors();
	List<MenuResWithImageDTO> getVendorMenuList(String email);
}
