package com.tiffin.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tiffin.service.ViewVendorService;

@RestController
@CrossOrigin
@RequestMapping("/home")
public class HomePageController {
	@Autowired
	private ViewVendorService viewVendorService;
	
	@GetMapping()
	public ResponseEntity<?> viewVendor(){
		return ResponseEntity.status(HttpStatus.FOUND).body(viewVendorService.findAllVendors());
	}
}
