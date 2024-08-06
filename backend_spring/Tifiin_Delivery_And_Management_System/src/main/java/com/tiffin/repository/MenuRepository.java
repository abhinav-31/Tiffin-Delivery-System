package com.tiffin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tiffin.entities.Menu;

public interface MenuRepository extends JpaRepository<Menu, Long>{

}
