package com.bandhan.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bandhan.entity.Gender;
import com.bandhan.entity.MaritialStatus;
import com.bandhan.entity.Religion;
import com.bandhan.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	public User findByEmail(String email);

	public List<User> findByGender(Gender gender);
	
	
	
	 @Query("SELECT u FROM User u WHERE " +
	           "(:income IS NULL OR u.income =:income) AND " +
	           "(:maritialStatus IS NULL OR u.maritialStatus = :maritialStatus) AND " +
	           "(:religion IS NULL OR u.religion = :religion) AND " +
	           "(:location IS NULL OR u.location LIKE %:location%)")
	    List<User> searchUsers(String income,  MaritialStatus maritialStatus, Religion religion, String location);
	 
Optional<User> findById(User sender2);
	 
	 @Query("SELECT u FROM User u WHERE " +
		       "(u.religion = :religion OR COALESCE(:religion, u.religion) = u.religion) AND " +
		       /*"(u.maritialStatus = :maritialStatus OR COALESCE(:maritialStatus, u.maritialStatus) = u.maritialStatus) AND " +*/
		       "(u.occupation = :occupation OR COALESCE(:occupation, u.occupation) = u.occupation) AND " +
		       "(u.location = :location OR COALESCE(:location, u.location) = u.location) AND " +
		       /*"(u.income = :income OR COALESCE(:income, u.income) = u.income) AND " +*/
		       "u.gender = :gender")
		List<User> findByFilters( /*@Param("income") String income,*/
				                  @Param("religion") Religion religion,
		                         /*@Param("maritialStatus") MaritialStatus maritialStatus,*/
		                         @Param("location") String location,
		                         @Param("occupation") String occupation,
		                         @Param("gender") Gender gender);


	
}
