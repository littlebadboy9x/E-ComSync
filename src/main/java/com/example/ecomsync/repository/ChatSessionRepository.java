package com.example.ecomsync.repository;

import com.example.ecomsync.model.ChatSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatSessionRepository extends JpaRepository<ChatSession, Integer> {
    List<ChatSession> findByUserId(Integer userId);
    List<ChatSession> findByUserIdAndIsActiveTrue(Integer userId);
    List<ChatSession> findByIsActiveTrue();
}
