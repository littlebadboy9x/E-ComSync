package com.example.ecomsync.controller;

import com.example.ecomsync.repository.ProductRepository;
import com.example.ecomsync.repository.UserRepository;
import com.example.ecomsync.repository.OrderRepository;
import com.example.ecomsync.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin/dashboard")
public class DashboardController {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderRepository orderRepository;

    @GetMapping
    public ResponseEntity<?> getDashboardStats() {
        long totalProducts = productRepository.count();
        long totalUsers = userRepository.count();
        long totalOrders = orderRepository.count();
        BigDecimal totalRevenue = orderRepository.findAll().stream()
                .map(Order::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        List<Map<String, Object>> recentOrders = orderRepository.findAll().stream()
                .sorted((o1, o2) -> o2.getOrderDate().compareTo(o1.getOrderDate()))
                .limit(5)
                .map(order -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("id", order.getId());
                    map.put("orderNumber", order.getId());
                    map.put("customer", order.getUser().getUsername());
                    map.put("date", order.getOrderDate());
                    map.put("status", order.getStatus());
                    map.put("total", order.getTotalAmount());
                    return map;
                })
                .collect(Collectors.toList());
        Map<String, Object> result = new HashMap<>();
        result.put("totalProducts", totalProducts);
        result.put("totalUsers", totalUsers);
        result.put("totalOrders", totalOrders);
        result.put("totalRevenue", totalRevenue);
        result.put("recentOrders", recentOrders);
        return ResponseEntity.ok(result);
    }
} 