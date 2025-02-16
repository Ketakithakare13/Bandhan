package com.bandhan.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bandhan.entity.User;
import com.bandhan.repository.AdminRepository;
import com.bandhan.repository.UserRepository;

@Service
public class AdminServiceImpl implements AdminService {
	
	@Autowired
	private AdminRepository adminRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public List<User> getAllUsers() {
        return userRepo.findAll();
    }

    @Override
    public Optional<User> getUserById(Long userId) {
        return userRepo.findById(userId);
    }

    @Override
    public void deleteUser(Long userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        userRepo.delete(user);
    }

    @Override
    public User updateUser(User user) {
        User existingUser = userRepo.findById(user.getId())
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + user.getId()));
        
        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setMobile(user.getMobile());
        existingUser.setLocation(user.getLocation());
        existingUser.setCaste(user.getCaste());
        existingUser.setOccupation(user.getOccupation());
        existingUser.setIncome(user.getIncome());
        existingUser.setPhoto(user.getPhoto());
        existingUser.setGender(user.getGender());
        existingUser.setMaritialStatus(user.getMaritialStatus());
        existingUser.setReligion(user.getReligion());
        
        return userRepo.save(existingUser);
    }
    

}
