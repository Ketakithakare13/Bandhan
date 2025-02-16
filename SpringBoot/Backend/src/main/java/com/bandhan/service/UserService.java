package com.bandhan.service;

import java.util.List;

import com.bandhan.entity.Gender;
import com.bandhan.entity.MaritialStatus;
import com.bandhan.entity.Religion;
import com.bandhan.entity.User;
import com.bandhan.exception.UserException;
import com.bandhan.request.FilterRequest;

public interface UserService {

	public User createUser(User user) throws UserException;

	public User findUserById(Long userId) throws UserException;

	public User findUserProfileByJwt(String jwt) throws UserException;

	public List<User> getAllMales();

	public List<User> getAllFemales();
	
	 public User getUserByEmail(String email);
	
	//public List<User> searchUsers(String income, String gender, String maritialStatus, String religion, String location);
	 public List<User> searchUsers(String income, MaritialStatus maritialStatus, Religion religion, String location);
	 
	 public User getUserById(Long receiverId);
		
		public List<User> filterUsers(FilterRequest filterRequest, Gender oppositeGender);

}
