package com.example.ecomsync.service;

import com.example.ecomsync.dto.ProductDTO;
import com.example.ecomsync.model.Product;
import com.example.ecomsync.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public Page<ProductDTO> findProductsByFilters(
            String search,
            String categoryId,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Pageable pageable) {

        Page<Product> products = productRepository.findProductsByFilters(
                search, categoryId, minPrice, maxPrice, pageable);

        return products.map(this::convertToDTO);
    }

    public ProductDTO findById(Long id) {
        Optional<Product> product = productRepository.findById(id);
        return product.map(this::convertToDTO).orElse(null);
    }

    public ProductDTO findBySlug(String slug) {
        Product product = productRepository.findBySlug(slug);
        return product != null ? convertToDTO(product) : null;
    }

    public List<ProductDTO> findRelatedProducts(String categoryId, Long excludeId, int limit) {
        Pageable pageable = PageRequest.of(0, limit);
        List<Product> products;

        if (excludeId != null) {
            products = productRepository.findRelatedProducts(categoryId, excludeId, pageable);
        } else {
            products = productRepository.findByCategorySlug(categoryId, pageable);
        }

        return products.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private ProductDTO convertToDTO(Product product) {
        ProductDTO dto = new ProductDTO();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setSlug(product.getSlug());
        dto.setDescription(product.getDescription());
        dto.setPrice(product.getPrice());
        dto.setDiscount_price(product.getDiscountPrice());
        dto.setImage_url(product.getImageUrl());
        dto.setRating(product.getRating());
        dto.setReviews(product.getReviews());
        dto.setStock_quantity(product.getStockQuantity());

        if (product.getCategory() != null) {
            dto.setCategory_id(product.getCategory().getSlug());
            dto.setCategory_name(product.getCategory().getName());
        }

        dto.setCreated_at(product.getCreatedAt());
        dto.setUpdated_at(product.getUpdatedAt());

        return dto;
    }
}
