package com.bandhan.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import com.bandhan.entity.Admin;
import com.bandhan.entity.User;
@Repository
public interface AdminRepository extends JpaRepository <Admin , Integer> {
	
	public boolean existsByEmail(String email);
	
	 Optional<Admin> findByEmail(String email);
	


}
