package com.example.ecomsync.controller;

import com.example.ecomsync.service.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/chatbot")
public class ChatbotController {
    private final AIService aiService;

    @Autowired
    public ChatbotController(AIService aiService) {
        this.aiService = aiService;
    }

    @PostMapping("/message")
    public Map<String, String> chat(@RequestBody Map<String, String> payload) {
        String userMessage = payload.getOrDefault("message", "");
        String reply = aiService.generateResponse(userMessage);
        Map<String, String> response = new HashMap<>();
        response.put("reply", reply);
        return response;
    }
} 