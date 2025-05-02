package com.example.ecomsync.controller;

import com.example.ecomsync.model.Product;
import com.example.ecomsync.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public Map<String, Object> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<Map<String, Object>> productList = products.stream().map(product -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", product.getId());
            map.put("name", product.getName());
            map.put("description", product.getDescription());
            map.put("price", product.getPrice());
            map.put("discountPrice", product.getDiscountPrice());
            map.put("quantityInStock", product.getQuantityInStock());
            map.put("category", product.getCategory());
            map.put("attributes", product.getAttributes());
            map.put("createdAt", product.getCreatedAt());
            map.put("updatedAt", product.getUpdatedAt());
            map.put("active", product.isActive());
            map.put("deleted", product.isDeleted());
            String imageUrl = null;
            try {
                imageUrl = (String) Product.class.getDeclaredField("imageUrl").get(product);
            } catch (Exception e) {
                // fallback nếu không có field imageUrl
            }
            if (imageUrl == null && product.getClass().getDeclaredFields() != null) {
                try {
                    imageUrl = (String) product.getClass().getMethod("getImageUrl").invoke(product);
                } catch (Exception e) {}
            }
            map.put("image_url", imageUrl);
            List<String> images = new java.util.ArrayList<>();
            if (product.getImages() != null && !product.getImages().isEmpty()) {
                images = product.getImages().stream().map(img -> {
                    try {
                        return (String) img.getClass().getMethod("getImageUrl").invoke(img);
                    } catch (Exception e) { return null; }
                }).filter(url -> url != null).collect(Collectors.toList());
            } else if (imageUrl != null) {
                images.add(imageUrl);
            }
            map.put("images", images);
            return map;
        }).collect(Collectors.toList());
        Map<String, Object> response = new HashMap<>();
        response.put("products", productList);
        response.put("totalProducts", productList.size());
        response.put("totalPages", 1);
        return response;
    }
}