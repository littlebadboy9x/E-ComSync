package com.example.ecomsync.repository;

import com.example.ecomsync.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p WHERE " +
            "(:search IS NULL OR LOWER(p.name) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(p.description) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
            "(:categoryId IS NULL OR p.category.slug = :categoryId) AND " +
            "(:minPrice IS NULL OR p.price >= :minPrice) AND " +
            "(:maxPrice IS NULL OR p.price <= :maxPrice)")
    Page<Product> findProductsByFilters(
            @Param("search") String search,
            @Param("categoryId") String categoryId,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            Pageable pageable);

    Product findBySlug(String slug);

    @Query("SELECT p FROM Product p WHERE p.category.slug = :categoryId AND p.id != :excludeId")
    List<Product> findRelatedProducts(
            @Param("categoryId") String categoryId,
            @Param("excludeId") Long excludeId,
            Pageable pageable);

    List<Product> findByCategorySlug(String categorySlug, Pageable pageable);
}

