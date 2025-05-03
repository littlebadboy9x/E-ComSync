package com.example.ecomsync.payload.reponse;

import lombok.Data;

import java.util.List;

@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private List<String> roles;

    public JwtResponse(String accessToken, Long id, String firstName, String lastName, String username, String email, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.roles = roles;
    }
}

