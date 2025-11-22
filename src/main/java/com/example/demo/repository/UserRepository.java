package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository {
    private final List<User> users = new ArrayList<>();
    
    public List<User> findAll() {
        return users;
    }

    public User save(User user) {
        users.add(user);
        return user;
    }

    public void deleteById(Long id) {
        users.removeIf(u -> u.getId().equals(id));
    }

    public Optional<User> findById(Long id) {
        return users.stream()
                    .filter(u -> u.getId().equals(id))
                    .findFirst();
    }
}
