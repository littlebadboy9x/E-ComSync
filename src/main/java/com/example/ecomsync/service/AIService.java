package com.example.ecomsync.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;
import java.util.*;

@Service
public class AIService {
    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.model}")
    private String model;

    private final RestTemplate restTemplate = new RestTemplate();

    public String generateResponse(String userMessage) {
        String apiUrl = "https://api.openai.com/v1/chat/completions";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        Map<String, Object> body = new HashMap<>();
        body.put("model", model);
        body.put("messages", List.of(Map.of("role", "user", "content", userMessage)));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        try {
            System.out.println("Calling OpenAI API with model: " + model);
            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl, request, Map.class);
            System.out.println("OpenAI API response: " + response.getBody());
            
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
            if (choices != null && !choices.isEmpty()) {
                Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                return (String) message.get("content");
            }
        } catch (Exception e) {
            System.err.println("Error calling OpenAI API: " + e.getMessage());
            e.printStackTrace();
            return "Xin lỗi, tôi không thể kết nối tới AI lúc này. Lỗi: " + e.getMessage();
        }
        return "Xin lỗi, tôi không thể trả lời lúc này.";
    }
}
