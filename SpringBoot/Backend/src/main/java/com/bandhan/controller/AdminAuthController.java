package com.bandhan.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.bandhan.config.JwtProvider;
import com.bandhan.entity.Admin;
import com.bandhan.repository.AdminRepository;
import com.bandhan.request.LoginRequest;
import com.bandhan.response.AuthResponse;

import lombok.RequiredArgsConstructor;
import java.util.Optional;

@RestController
@RequestMapping("/admin/auth")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class AdminAuthController {

    private final AdminRepository adminRepo;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;

    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> loginUserHandler(@RequestBody LoginRequest loginRequest) {

        String username = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        Authentication authentication = authenticate(username, password);

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwtProvider.generateToken(authentication);

        AuthResponse authResponse = new AuthResponse();
        authResponse.setJwt(token);
        authResponse.setMessage("Signin success");

        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    private Authentication authenticate(String username, String password) {
        Optional<Admin> optionalAdmin = adminRepo.findByEmail(username);

        if (optionalAdmin.isEmpty()) {
            throw new BadCredentialsException("Invalid Username.......");
        }

        Admin admin = optionalAdmin.get();

        if (!passwordEncoder.matches(password, admin.getPassword())) {
            throw new BadCredentialsException("Invalid Password.......");
        }

        return new UsernamePasswordAuthenticationToken(admin, null, null);
    }

    @PostMapping("/logout")
    public ResponseEntity<AuthResponse> logoutUserHandler() {
        SecurityContextHolder.clearContext();

        AuthResponse authResponse = new AuthResponse();
        authResponse.setMessage("Logout successful");

        return new ResponseEntity<>(authResponse, HttpStatus.OK);
    }
}
