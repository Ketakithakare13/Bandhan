package com.bandhan.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.bandhan.entity.User;
import com.bandhan.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return adminService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getUserById(id));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        user.setId(id);
        return ResponseEntity.ok(adminService.updateUser(user));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }
}
