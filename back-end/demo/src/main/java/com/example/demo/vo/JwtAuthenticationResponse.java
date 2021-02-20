package com.example.demo.vo;

public class JwtAuthenticationResponse {
	
	private String accessToken;
	private String tokenType="Bearer";
	private UserVO user;
	
	public void setUser(UserVO u) {
		this.user=u;
	}
	public UserVO getUser() {
		return user;
	}
	
	public JwtAuthenticationResponse(String a,UserVO u) {
		this.user=u;
		this.accessToken=a;
	}
	public String getAccessToken() {
		return accessToken;
	}
	public void setAccessToken(String a) {
		this.accessToken=a;
	}
	
	public String getTokenType() {
		return tokenType;
	}
	public void setTokenType(String tokenType) {
		this.tokenType=tokenType;
	}

}
