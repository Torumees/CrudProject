package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    
    @Autowired
    private UserRepository repo;

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public void addUser(User user) {
        repo.save(user);
    }
}
