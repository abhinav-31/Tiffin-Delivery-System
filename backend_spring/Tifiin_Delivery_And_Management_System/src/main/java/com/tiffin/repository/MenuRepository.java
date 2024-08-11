package com.tiffin.repository;

import com.tiffin.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import com.tiffin.entities.Menu;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface MenuRepository extends JpaRepository<Menu, Long> {
  List<Menu> findByVendor(User vendor);
}
