package com.example.ecomsync.service;
import com.example.ecomsync.dto.CategoryDTO;
import com.example.ecomsync.model.Category;
import com.example.ecomsync.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public List<CategoryDTO> findAll() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public CategoryDTO findBySlug(String slug) {
        Category category = categoryRepository.findBySlug(slug);
        return category != null ? convertToDTO(category) : null;
    }

    private CategoryDTO convertToDTO(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setSlug(category.getSlug());
        dto.setDescription(category.getDescription());
        dto.setCreated_at(category.getCreatedAt());
        dto.setUpdated_at(category.getUpdatedAt());
        return dto;
    }
}
