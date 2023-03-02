package com.misoft.cafe.repository;

import com.misoft.cafe.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {

    List<Category> getAllCategory();

}
