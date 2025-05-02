package com.example.ecomsync.config;

import com.example.ecomsync.model.User;
import com.example.ecomsync.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserService userService;

    @Override
    public void run(String... args) throws Exception {
        // Check if admin user exists
        if (!userService.findUserByUsername("admin").isPresent()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword("admin123"); // Password will be encoded by UserService
            admin.setEmail("admin@example.com");
            admin.setFirstName("Admin");
            admin.setLastName("User");
            
            Set<String> roles = new HashSet<>();
            roles.add("ROLE_ADMIN");
            roles.add("ROLE_USER");
            admin.setRoles(roles);
            
            userService.saveUser(admin);
            System.out.println("Admin user created successfully");
        }
    }
} 