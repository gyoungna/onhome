package com.example.demo.security;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.PrincipalMethodArgumentResolver;

import com.example.demo.mapper.UserMapper;
import com.example.demo.vo.UserVO;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	UserMapper mapper;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserVO user=mapper.fetchUserByID(username);
		UserPrincipal userprincipal=new UserPrincipal();
		
		userprincipal.setAuthorities(user.getAuth());
		userprincipal.setPassword(user.getPw());
		userprincipal.setUsername(user.getId());
		
		return userprincipal;
	}
	
	
}
