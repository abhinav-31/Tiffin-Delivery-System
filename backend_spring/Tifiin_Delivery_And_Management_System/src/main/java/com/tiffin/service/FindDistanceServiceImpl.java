package com.tiffin.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tiffin.custom_exceptions.ResourceNotFoundException;
import com.tiffin.entities.DeliveryBoy;
import com.tiffin.enums.DeliveryStatus;
import com.tiffin.repository.DeliveryBoyRepository;

import jakarta.transaction.Transactional;
import lombok.Getter;

@Getter
@Service
@Transactional
public class FindDistanceServiceImpl implements FindDistanceService {

	@Autowired
	private DeliveryBoyRepository deliveryBoyRepository;
	
	private static final List<String> reference = List.of("411057", "411157", "411058", "411059", "411060", "411061",
			"411557", "411082", "411997", "411050");
	private static final int[][] distMatrix = { { 0, 5, 2, 8, 3, 7, 1, 9, 4, 6 }, { 7, 0, 3, 10, 5, 8, 6, 2, 9, 1 },
			{ 9, 6, 0, 4, 7, 2, 8, 5, 10, 3 }, { 5, 8, 1, 0, 2, 4, 7, 6, 3, 9 }, { 3, 2, 7, 9, 0, 1, 10, 8, 6, 4 },
			{ 1, 4, 6, 5, 3, 0, 9, 7, 2, 8 }, { 10, 3, 4, 6, 9, 2, 0, 1, 7, 5 }, { 6, 7, 9, 1, 8, 3, 5, 0, 2, 10 },
			{ 8, 10, 5, 7, 4, 9, 2, 3, 0, 6 }, { 2, 9, 8, 3, 6, 5, 4, 10, 1, 0 } };
	
	@Override
	public Optional<DeliveryBoy> findSuitableDeliveryBoy(String vendorPincode) {
		int vendorPincodeIndex = reference.indexOf(vendorPincode);
		if (vendorPincodeIndex == -1) {
			throw new ResourceNotFoundException("Pincode " + vendorPincode + " is not supported.");
		}

		int min = Integer.MAX_VALUE;
		Optional<DeliveryBoy> minDistDeliveryBoy = Optional.empty();

		for (DeliveryBoy d : deliveryBoyRepository.findByStatus(DeliveryStatus.AVAILABLE)) {
			int deliveryBoyPincodeIndex = reference.indexOf(d.getCurrentPincode());
			if (deliveryBoyPincodeIndex == -1) {
				// Log the unsupported pincode for further investigation
				System.out.println("Unsupported pincode for delivery boy: " + d.getCurrentPincode());
				continue; // Skip delivery boys with unsupported pincodes
			}

			if (deliveryBoyPincodeIndex >= 0 && deliveryBoyPincodeIndex < distMatrix.length && vendorPincodeIndex >= 0
					&& vendorPincodeIndex < distMatrix[0].length) {
				int distance = distMatrix[deliveryBoyPincodeIndex][vendorPincodeIndex];
				if (distance < min) {
					min = distance;
					minDistDeliveryBoy = Optional.of(d);
				}
			} else {
				// Log if indices are out of bounds
				System.out.println("Out of bounds index for delivery boy's pincode: " + d.getCurrentPincode());
			}
		}

		return minDistDeliveryBoy;
	}
	@Override
	public int deliveryDistanceBetweenVendorAndCust(String customerPincode, String vendorPincode) {
		int vendorPincodeIndex = reference.indexOf(vendorPincode);
		int customerPincodeIndex = reference.indexOf(customerPincode);
		return distMatrix[customerPincodeIndex][vendorPincodeIndex];
	}
	public static List<String> getReference() {
		return reference;
	}
	public static int[][] getDistmatrix() {
		return distMatrix;
	}
	
}
