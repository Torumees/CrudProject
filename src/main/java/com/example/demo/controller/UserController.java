package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
@RestController
@RequestMapping("/users")
public class UserController {
    
    @Autowired
    private UserService service;

    @GetMapping
    public List<User> getAllUsers() {
        log.info("GET /users called");
        return service.getAllUsers();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        log.info("POST /users called with user: {}", user);
        return service.addUser(user);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        log.info("DELETE /users/{} called", id);
        service.deleteUser(id);
    }
}
