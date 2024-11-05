package com.tiffin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tiffin.entities.Menu;
import com.tiffin.entities.User;

@Repository
public interface MenuRepository extends JpaRepository<Menu, Long> {
  List<Menu> findByVendor(User vendor);
  List<Menu> findAllByVendor(User vendor);
  List<Menu> findByVendorAndIsDeletedFalse(User vendor);
}
