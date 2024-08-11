package com.tiffin.service;

import java.util.List;

import com.tiffin.dto.VendorViewDTO;

public interface ViewVendorService {

	List<VendorViewDTO> findAllVendors();

}
