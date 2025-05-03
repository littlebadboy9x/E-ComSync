package com.example.ecomsync.controller;

import com.example.ecomsync.dto.CategoryDTO;
import com.example.ecomsync.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public ResponseEntity<List<CategoryDTO>> getAllCategories() {
        List<CategoryDTO> categories = categoryService.findAll();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/{slug}")
    public ResponseEntity<CategoryDTO> getCategoryBySlug(@PathVariable String slug) {
        CategoryDTO category = categoryService.findBySlug(slug);
        if (category != null) {
            return ResponseEntity.ok(category);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
