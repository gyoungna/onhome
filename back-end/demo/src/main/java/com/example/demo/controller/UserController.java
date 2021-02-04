package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.mapper.UserMapper;
import com.example.demo.vo.UserVO;

@CrossOrigin(origins="*", maxAge=3600)
@RestController
@RequestMapping("/users")
public class UserController {

		@Autowired
		UserMapper userMapper;
		@PostMapping
		void insertUser(@RequestBody UserVO user) {
			user.setAuth("NO");
			userMapper.insertUser(user);
			System.out.println(user.getPw());
			
		}
}
