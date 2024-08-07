package com.tiffin.controllers;

import com.tiffin.dto.MenuReqDTO;
import com.tiffin.entities.Menu;
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
		    public ResponseEntity<?> uploadImage(
		            @PathVariable Long vendorId,
		            @RequestParam MultipartFile image,
		            @RequestBody MenuReqDTO menuDTO) throws IOException {
		return ResponseEntity.status(HttpStatus.CREATED).body(menuService.addMenu(menuDTO, vendorId, image));
		//     		System.out.println("Image file uploaded successfully for emp " + Menu.getFirstName());
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
    public ResponseEntity<List<MenuReqDTO>> getAllMenus() {
        List<MenuReqDTO> menus = menuService.getAllMenus();
        return ResponseEntity.ok(menus);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MenuReqDTO> getMenuById(@PathVariable Long id) {
        MenuReqDTO menu = menuService.getMenuById(id);
        return ResponseEntity.ok(menu);
    }
}
