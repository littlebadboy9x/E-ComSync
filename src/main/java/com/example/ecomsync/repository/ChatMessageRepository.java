package com.example.ecomsync.repository;

import com.example.ecomsync.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Integer> {
    List<ChatMessage> findBySessionIdOrderByTimestampAsc(Integer sessionId);
    List<ChatMessage> findBySessionIdAndIsReadFalse(Integer sessionId);
}
