package com.bandhan.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
public class User {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String name;
	private String password;
	private String email;
	
	private String mobile;
	private String dateOfBirth; // Consider using LocalDate for better date handling.
    private String location;
    private String caste;
    private String occupation;
    private String income; // You can use BigDecimal if you need precise income representation.
    private String photo; // Store the photo URL or path.
    
    private String transactionid;
    private String paymentstatus;
    
    @Enumerated(EnumType.STRING)
    private Gender gender; // Example: Male, Female, Other.
    @Enumerated(EnumType.STRING)
    private MaritialStatus maritialStatus; // Example: Single, Married, Divorced.
    @Enumerated(EnumType.STRING)
    private Religion religion; // Example: Hindu, Muslim, Christian, etc.
    
    @Enumerated(EnumType.STRING)
    private Role role;
    
    @PrePersist
    public void setDefaultRole() {
        if (this.role == null) {
            this.role = Role.USER;  // Set default role to USER if not provided
        }
    }

	public User orElse(Object object) {
		// TODO Auto-generated method stub
		return null;
	}
	


}
