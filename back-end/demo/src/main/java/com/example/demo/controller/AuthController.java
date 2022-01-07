package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.mapper.UserMapper;
import com.example.demo.security.jwtTokenProvider;
import com.example.demo.vo.JwtAuthenticationResponse;
import com.example.demo.vo.LoginRequest;
import com.example.demo.vo.UserVO;

@CrossOrigin(origins="*", maxAge=3600)
@RestController
public class AuthController {
	
	
	AuthenticationManager authenticationManager;
	
	UserMapper mapper;
	
	PasswordEncoder passwordEncoder;
	
	jwtTokenProvider provider;
	
	@Autowired
	public AuthController(AuthenticationManager authenticationManager,UserMapper mapper,PasswordEncoder passwordEncoder,jwtTokenProvider provider)
	{
	
		this.authenticationManager=authenticationManager;
		this.mapper=mapper;
		this.passwordEncoder=passwordEncoder;
		this.provider=provider;
	}
	
	
	
	//로그인
	@PostMapping("/authenticate")
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginrequest){
		
		//로그인
		Authentication authentication=authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginrequest.getId(),loginrequest.getPw()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		UserVO user=mapper.fetchUserByID(loginrequest.getId());
		String jwt=provider.generateToken(authentication);//jwt생성
		return ResponseEntity.ok(new JwtAuthenticationResponse(jwt,user));//jwt반환
	}
	
	/*
	 @GetMapping("/signUpConfirm/email/{email}/authkey/{authkey}")//이메일 인증
	 public String signUpConfirm(@PathVariable String email,@PathVariable String authkey){
		 
		 UserVO user=mapper.getUserByEmail(email);
		
		 
		 if(user.getAuthkey().contentEquals(authkey)) {
			 if(user.getAuth().contentEquals("NOSTU"))
			 {
				 user.setAuth("STU");
				 mapper.updateUser(user);
				 return "인증되었습니다.";
			 }
			 else if(user.getAuth().contentEquals("NOTEA"))
			 {
				 user.setAuth("TEA");
				 mapper.updateUser(user);
				 return "인증되었습니다.";
			 }
		 }
		return null;

	}
*/
}
