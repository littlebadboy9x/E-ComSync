package com.example.ecomsync.service;

import com.example.ecomsync.dto.ProductDTO;
import com.example.ecomsync.model.Product;
import com.example.ecomsync.repository.ProductRepository;
import com.example.ecomsync.repository.CategoryRepository;
import com.example.ecomsync.model.Category;
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

    @Autowired
    private CategoryRepository categoryRepository;

    public Page<ProductDTO> findProductsByFilters(
            String search,
            String categoryId,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            Pageable pageable) {

        Page<Product> products = productRepository.findAll(pageable);
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

    public ProductDTO createProduct(ProductDTO productDTO) {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setSlug(productDTO.getSlug());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setDiscountPrice(productDTO.getDiscount_price());
        product.setImageUrl(productDTO.getImage_url());
        product.setRating(productDTO.getRating());
        product.setReviews(productDTO.getReviews());
        product.setStockQuantity(productDTO.getStock_quantity());
        // Set category nếu có
        if (productDTO.getCategory_id() != null && !productDTO.getCategory_id().isEmpty()) {
            try {
                Long catId = Long.parseLong(productDTO.getCategory_id());
                Category category = categoryRepository.findById(catId)
                    .orElseThrow(() -> new RuntimeException("Category not found"));
                product.setCategory(category);
            } catch (NumberFormatException e) {
                throw new RuntimeException("Invalid category_id format");
            }
        }
        Product saved = productRepository.save(product);
        return convertToDTO(saved);
    }

    public ProductDTO updateProduct(Long id, ProductDTO productDTO) {
        Product product = productRepository.findById(id).orElseThrow();
        product.setName(productDTO.getName());
        product.setSlug(productDTO.getSlug());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setDiscountPrice(productDTO.getDiscount_price());
        product.setImageUrl(productDTO.getImage_url());
        product.setRating(productDTO.getRating());
        product.setReviews(productDTO.getReviews());
        product.setStockQuantity(productDTO.getStock_quantity());
        // Set category nếu có
        if (productDTO.getCategory_id() != null && !productDTO.getCategory_id().isEmpty()) {
            try {
                Long catId = Long.parseLong(productDTO.getCategory_id());
                Category category = categoryRepository.findById(catId)
                    .orElseThrow(() -> new RuntimeException("Category not found"));
                product.setCategory(category);
            } catch (NumberFormatException e) {
                throw new RuntimeException("Invalid category_id format");
            }
        }
        Product saved = productRepository.save(product);
        return convertToDTO(saved);
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
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
