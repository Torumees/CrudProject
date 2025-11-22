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

    private long nextId = 1;

    public List<User> getAllUsers() {
        List<User> users = repository.findAll();
        log.info("Returning {} users: {}", users.size(), users);
        return users;
    }

    public User addUser(User user) {
        user.setId(nextId++);
        log.info("Saving user in service: {}", user);
        return repository.save(user);
    }

    public void deleteUser(Long id) {
        log.info("Deleting user with id: {}", id);
        repository.deleteById(id);
    }
}
