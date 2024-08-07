package com.tiffin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import com.tiffin.custom_exceptions.ResourceNotFoundException;
import com.tiffin.entities.DeliveryBoy;
import com.tiffin.entities.User;
import com.tiffin.enums.DeliveryStatus;
import com.tiffin.repository.DeliveryBoyRepository;
import com.tiffin.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class DeliveryBoyServiceImpl implements DeliveryBoyService {
	@Autowired
	private DeliveryBoyRepository deliveryBoyRepository;
	@Autowired
	private UserRepository userRepository;
	
	@Override
	public void SetStatusAvailable(Long id) {    // we can send delivery boy directly here instead sending his id 
		// find delivery boy by its id from user table
		User deliveryBoy = userRepository.findById(id).orElseThrow(()-> new ResourceNotFoundException("Delivery Boy Not Exist!"));
		// then set there status to available 
		// by using there foreign key
		DeliveryBoy dBoy = deliveryBoyRepository.findByDeliveryBoy(deliveryBoy).orElseThrow(()-> new ResourceNotFoundException(""));
		dBoy.setStatus(DeliveryStatus.AVAILABLE);
	}
	
}
