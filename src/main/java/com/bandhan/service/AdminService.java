package com.bandhan.service;


import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.bandhan.entity.Admin;
import com.bandhan.entity.User;

@Service
public interface AdminService {
	
	List<User> getAllUsers();
	
    Optional<User> getUserById(Long userId);
    
    void deleteUser(Long userId);
    
    User updateUser(User user);

}
