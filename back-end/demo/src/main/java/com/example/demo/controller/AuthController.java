package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.mapper.UserMapper;
import com.example.demo.security.jwtTokenProvider;
import com.example.demo.vo.JwtAuthenticationResponse;
import com.example.demo.vo.LoginRequest;
import com.example.demo.vo.UserVO;

@RestController
public class AuthController {
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	UserMapper mapper;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	jwtTokenProvider provider;
	
	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginrequest){
		
		Authentication authentication=authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginrequest.getId(),loginrequest.getPw()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		UserVO user=mapper.fetchUserByID(loginrequest.getId());
		String jwt=provider.generateToken(authentication);
		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt,user));
	}

}
