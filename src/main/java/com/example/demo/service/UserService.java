package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class UserService {
    
    @Autowired
    private UserRepository repository;

    public List<User> getAllUsers() {
        List<User> users = repository.findAll();
        log.info("Returning {} users: {}", users.size(), users);
        return users;
    }

    public User addUser(User user) {
        User saved = repository.save(user);
        log.info("Saving user in service: {}", saved);
        return saved;
    }

    public void deleteUser(Long id) {
        log.info("Deleting user with id: {}", id);
        repository.deleteById(id);
    }

    public User updateUser(Long id, User updated) {
        User existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id" + id));
        
        existing.setName(updated.getName());
        existing.setEmail(updated.getEmail());

        User saved = repository.save(existing);
        log.info("Updated user: {}", existing);
        return saved;
    }
}
