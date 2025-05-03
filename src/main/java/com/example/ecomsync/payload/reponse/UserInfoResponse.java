package com.example.ecomsync.payload.reponse;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class UserInfoResponse {
    private Long id;
    private String name;
    private String username;
    private String email;
    private List<String> roles;
}
