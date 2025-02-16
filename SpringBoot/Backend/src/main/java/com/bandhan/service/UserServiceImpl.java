package com.bandhan.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.bandhan.entity.Gender;
import com.bandhan.entity.MaritialStatus;
import com.bandhan.entity.Religion;
import com.bandhan.entity.User;
import com.bandhan.exception.UserException;
import com.bandhan.repository.UserRepository;
import com.bandhan.request.FilterRequest;

@Service
public class UserServiceImpl implements UserService,UserDetailsService {
	
	  private UserRepository userRepository;

	    public UserServiceImpl(UserRepository userRepository) {
	        this.userRepository = userRepository;
	    }
	@Override
	public User findUserById(Long userId) throws UserException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User findUserProfileByJwt(String jwt) throws UserException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User createUser(User user) throws UserException {
		 
		return userRepository.save(user);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user=userRepository.findByEmail(username);
		if(user==null) {
			throw new UsernameNotFoundException("user not found with email-"+username);
			
		}
		List<GrantedAuthority> authorities=new ArrayList<>();
		return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),authorities);
	}
	@Override
	public List<User> getAllMales() {
		
		return userRepository.findByGender(Gender.MALE);
	}
	@Override
	public List<User> getAllFemales() {
		return userRepository.findByGender(Gender.FEMALE);
	}
	
	//Search user 
	@Override
	public List<User> searchUsers(String income,  MaritialStatus maritialStatus, Religion religion,
			String location) {
		
		return userRepository.searchUsers(income,  maritialStatus, religion, location);
	}
	@Override
	public User getUserByEmail(String email) {
		// TODO Auto-generated method stub
		return null;
	}
	
	@Override
	public User getUserById(Long receiverId) {
		// TODO Auto-generated method stub
		return null;
	}
	
	public List<User> filterUsers(FilterRequest filterRequest, Gender oppositeGender) {
		 //  Debugging logs in Service
	    System.out.println(" Service Layer - Filtering Users...");
	    System.out.println(" Filter Request: " + filterRequest);
	    System.out.println(" Opposite Gender: " + oppositeGender);

	    // Check if any value is null before calling the repository
	    System.out.println("🔹Executing Query with: " +
	                      /* "Income = " + filterRequest.getIncome() + ", " +*/
	                       "Religion = " + filterRequest.getReligion() + ", " +
	                      /* "Marital Status = " + filterRequest.getMaritialStatus() + ", " +*/
	                       "Location = " + filterRequest.getLocation() + ", " +
	                       "Occupation = " + filterRequest.getOccupation() + ", " +
	                       "Gender = " + oppositeGender);
	    return userRepository.findByFilters(
	        /*filterRequest.getIncome(),*/
	        filterRequest.getReligion(),
	        /*filterRequest.getMaritialStatus(),*/
	        filterRequest.getLocation(),
	        filterRequest.getOccupation(),
	        oppositeGender
	    );
	}

	
	

}

	
	
//	private UserRepository userRepository;
//	public UserServiceImpl(UserRepository userRepository) {
//		this.userRepository=userRepository;
//	}
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		User user=userRepository.findByEmail(username);
//		if(user==null) {
//			throw new UsernameNotFoundException("user not found with email-"+username);
//			
//		}
//		List<GrantedAuthority> authorities=new ArrayList<>();
//		return new org.springframework.security.core.userdetails.User(user.getEmail(),user.getPassword(),authorities);
//	}

	

