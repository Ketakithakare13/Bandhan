package com.bandhan.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginRequest {
	
	private String email;
	private String password;
	
	public LoginRequest() {
		
	}

	public LoginRequest(String email, String password) {
		super();
		this.email = email;
		this.password = password;
	}

}
