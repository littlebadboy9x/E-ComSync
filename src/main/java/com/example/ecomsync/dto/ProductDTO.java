package com.example.ecomsync.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDTO {
    private Long id;
    private String name;
    private String slug;
    private String description;
    private BigDecimal price;
    private BigDecimal discount_price;
    private String image_url;
    private Double rating;
    private Integer reviews;
    private Integer stock_quantity;
    private String category_id;
    private String category_name;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;
}
