package com.tiffin.controllers;

import com.tiffin.dto.ApiResponse;
import com.tiffin.dto.MenuDTO;
import com.tiffin.dto.MenuReqDTO;
import com.tiffin.dto.MenuResWithImageDTO;
import com.tiffin.entities.Menu;
import com.tiffin.enums.MenuCategory;
import com.tiffin.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/menus")
@CrossOrigin
public class MenuController {

  @Autowired
  private MenuService menuService;

  @PostMapping(value = "/addMenu/{vendorId}", consumes = "multipart/form-data")
  public ResponseEntity<?> addMenuWithImage(@PathVariable Long vendorId, @RequestParam("image") MultipartFile image,
                                       @RequestParam("name") String name, @RequestParam("description") String description,
                                       @RequestParam("price") Double price, @RequestParam("category") String category,
                                       @RequestParam("quantity") Integer quantity) throws IOException {

    // Create MenuReqDTO from request parameters
    MenuReqDTO menuDTO = new MenuReqDTO();
    menuDTO.setName(name);
    menuDTO.setDescription(description);
    menuDTO.setPrice(price);
    menuDTO.setCategory(MenuCategory.valueOf(category)); // Convert category string to enum
    menuDTO.setQuantity(quantity);

    // Call the service method
    return ResponseEntity.status(HttpStatus.CREATED).body(menuService.addMenu(menuDTO, vendorId, image));
  }

  @PutMapping("/{id}")
  public ResponseEntity<MenuReqDTO> updateMenu(@PathVariable Long id, @RequestBody MenuReqDTO menuDTO) {
    MenuReqDTO updatedMenu = menuService.updateMenu(id, menuDTO);
    
    return ResponseEntity.ok(updatedMenu);
  }
  @DeleteMapping
  public ResponseEntity<ApiResponse> deleteMenu(@RequestBody MenuDTO menuDTO) {
    return ResponseEntity.status(HttpStatus.CREATED).body(menuService.deleteMenu(menuDTO));
  }

  @GetMapping("/vendor/{vendorId}")
  public ResponseEntity<List<MenuResWithImageDTO>> getAllMenus(@PathVariable Long vendorId) {
    List<MenuResWithImageDTO> menus = menuService.getAllMenusOfVendor(vendorId);
    return ResponseEntity.ok(menus);
  }

  @GetMapping("/{id}")
  public ResponseEntity<MenuResWithImageDTO> getMenuById(@PathVariable Long id) {
    MenuResWithImageDTO menu = menuService.getMenuById(id);
    return ResponseEntity.ok(menu);
  }

  @GetMapping("/viewMenuOfVendor/{vendorId}")
  public ResponseEntity<List<MenuResWithImageDTO>> getMenuByVendorId(@PathVariable Long vendorId) {
    List<MenuResWithImageDTO> menus = menuService.getMenuByVendorId(vendorId);
    return ResponseEntity.ok(menus);
  }
  @PostMapping("/updateQuantity")
  public ResponseEntity<ApiResponse> updateMenuQuantity(@RequestBody MenuDTO menuDTO) {
	  System.out.println("Update menu quantity");
    return ResponseEntity.status(HttpStatus.CREATED).body(menuService.updateMenuQuantity(menuDTO));
  }
}
