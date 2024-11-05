package com.tiffin.service;

import java.util.Optional;

import com.tiffin.entities.DeliveryBoy;

public interface FindDistanceService {
	public Optional<DeliveryBoy> findSuitableDeliveryBoy(String vendorPincode);

	int deliveryDistanceBetweenVendorAndCust(String customerPincode, String vendorPincode);
}
