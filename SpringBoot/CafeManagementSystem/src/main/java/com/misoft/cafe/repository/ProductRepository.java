package com.misoft.cafe.repository;

import com.misoft.cafe.entity.Product;
import com.misoft.cafe.wrapper.ProductWrapper;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<ProductWrapper> getAllProduct();
}
