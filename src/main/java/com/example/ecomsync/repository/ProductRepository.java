package com.example.ecomsync.repository;

import com.example.ecomsync.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByCategoryId(Integer categoryId);

    @Query("SELECT p FROM Product p WHERE p.name LIKE %?1% OR p.description LIKE %?1%")
    List<Product> searchProducts(String query);

    List<Product> findByIsActiveTrue();
}

