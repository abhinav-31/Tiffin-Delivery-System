package com.tiffin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tiffin.entities.Menu;
import com.tiffin.entities.User;

public interface MenuRepository extends JpaRepository<Menu, Long> {
  List<Menu> findByVendor(User vendor);
  List<Menu> findAllByVendor(User vendor);
  List<Menu> findByVendorAndIsDeletedFalse(User vendor);
}
