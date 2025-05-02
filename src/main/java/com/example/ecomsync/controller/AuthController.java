package com.example.ecomsync.controller;

import com.example.ecomsync.dto.LoginRequest;
import com.example.ecomsync.dto.LoginResponse;
import com.example.ecomsync.model.User;
import com.example.ecomsync.security.JwtTokenProvider;
import com.example.ecomsync.service.AuthService;
import com.example.ecomsync.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        return ResponseEntity.ok(authService.getCurrentUser());
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        user.getRoles().add("ROLE_USER");
        User savedUser = userService.saveUser(user);
        return ResponseEntity.ok(savedUser);
    }
} 