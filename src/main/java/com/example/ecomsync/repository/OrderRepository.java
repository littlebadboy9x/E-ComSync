package com.example.ecomsync.repository;

import com.example.ecomsync.model.Order;
import com.example.ecomsync.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    List<Order> findByUser(User user);
    List<Order> findByUserOrderByOrderDateDesc(User user);
    List<Order> findByStatus(String status);
}

