package com.bandhan.response;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class UserResponse {

	

	private String message;
	public UserResponse() {
		
	}
	public UserResponse(String message) {
		super();
		this.message = message;
	}
	
}
