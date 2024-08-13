package com.tiffin.service;

import com.tiffin.custom_exceptions.ResourceNotFoundException;
import com.tiffin.dto.MenuReqDTO;
import com.tiffin.dto.MenuResWithImageDTO;
import com.tiffin.entities.Menu;
import com.tiffin.entities.User;
import com.tiffin.repository.MenuRepository;
import com.tiffin.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.lang.module.ResolutionException;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MenuServiceImpl implements MenuService {

    @Autowired
    private MenuRepository menuRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public MenuReqDTO addMenu(MenuReqDTO menuDTO, Long vendorId, MultipartFile image) throws IOException {
        Menu menu = modelMapper.map(menuDTO, Menu.class);
        User vendor = userRepository.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        menu.setVendor(vendor);
        menu.setMenuImage(image.getBytes());
        menu = menuRepository.save(menu);
        return modelMapper.map(menu, MenuReqDTO.class);
    }

    @Override
    public MenuReqDTO updateMenu(Long id, MenuReqDTO menuDTO) {
        Menu menu = menuRepository.findById(id).orElseThrow(() -> new RuntimeException("Menu not found"));
        modelMapper.map(menuDTO, menu);
        User vendor = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));
        menu.setVendor(vendor);
        menu = menuRepository.save(menu);
        return modelMapper.map(menu, MenuReqDTO.class);
    }

    @Override
    public void deleteMenu(Long id) {
        menuRepository.deleteById(id);
    }

    @Override
    public List<MenuResWithImageDTO> getAllMenusOfVendor(Long vendorId) {
        User vendor = userRepository.findById(vendorId).orElseThrow(()->new ResourceNotFoundException("No vendor found"));
        return menuRepository.findByVendor(vendor).stream()
                .map(menu -> modelMapper.map(menu, MenuResWithImageDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public MenuResWithImageDTO getMenuById(Long id) {
        Menu menu = menuRepository.findById(id).orElseThrow(() -> new RuntimeException("Menu not found"));
        return modelMapper.map(menu, MenuResWithImageDTO.class);
    }

    @Override
    public List<MenuResWithImageDTO> getMenuByVendorId(Long vendorId) {
        User vendor = userRepository.findById(vendorId).orElseThrow(()->new ResolutionException("No vendor found"));
        return menuRepository.findByVendor(vendor).stream()
                .map(menu->modelMapper.map(menu, MenuResWithImageDTO.class))
                .collect(Collectors.toList());
    }
}
