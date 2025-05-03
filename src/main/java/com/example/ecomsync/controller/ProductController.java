package com.example.ecomsync.controller;

import com.example.ecomsync.dto.ProductDTO;
import com.example.ecomsync.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public ResponseEntity<Page<ProductDTO>> getProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "9") int size,
            @RequestParam(defaultValue = "id,asc") String[] sort) {

        // Xử lý sắp xếp
        String sortField = sort[0];
        Sort.Direction direction = Sort.Direction.ASC;

        if (sort.length > 1 && sort[1].equalsIgnoreCase("desc")) {
            direction = Sort.Direction.DESC;
        }

        // Xử lý trường hợp "featured" - sắp xếp theo id mặc định
        if (sortField.equalsIgnoreCase("featured")) {
            sortField = "id";
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortField));

        Page<ProductDTO> products = productService.findProductsByFilters(
                search, category, minPrice, maxPrice, pageable);

        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProductById(@PathVariable Long id) {
        ProductDTO product = productService.findById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/slug/{slug}")
    public ResponseEntity<ProductDTO> getProductBySlug(@PathVariable String slug) {
        ProductDTO product = productService.findBySlug(slug);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/related/{categoryId}")
    public ResponseEntity<List<ProductDTO>> getRelatedProducts(
            @PathVariable String categoryId,
            @RequestParam(required = false) Long excludeId) {
        List<ProductDTO> relatedProducts = productService.findRelatedProducts(categoryId, excludeId, 4);
        return ResponseEntity.ok(relatedProducts);
    }
}