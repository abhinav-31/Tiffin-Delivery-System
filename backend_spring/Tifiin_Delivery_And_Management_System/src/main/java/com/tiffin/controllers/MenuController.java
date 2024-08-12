package com.tiffin.controllers;

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

  //	@PostMapping(value = "/addMenu/{vendorId}", consumes = "multipart/form-data")
//	public ResponseEntity<?> uploadImage(@PathVariable Long vendorId, @RequestParam MultipartFile image,
//			@RequestParam MenuReqDTO menuDTO) throws IOException {
//		return ResponseEntity.status(HttpStatus.CREATED).body(menuService.addMenu(menuDTO, vendorId, image));
//		// System.out.println("Image file uploaded successfully for emp " +
//		// Menu.getFirstName());
//	}
  @PostMapping(value = "/addMenu/{vendorId}", consumes = "multipart/form-data")
  public ResponseEntity<?> uploadImage(@PathVariable Long vendorId, @RequestParam("image") MultipartFile image,
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

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteMenu(@PathVariable Long id) {
    menuService.deleteMenu(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping
  public ResponseEntity<List<MenuResWithImageDTO>> getAllMenus() {
    List<MenuResWithImageDTO> menus = menuService.getAllMenus();
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
}
