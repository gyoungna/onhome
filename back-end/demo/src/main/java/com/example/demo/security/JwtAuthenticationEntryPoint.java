package com.example.demo.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;



//인증이 이루어지지 않은 상황에서 접근시도 시 401에러 반환
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

	private static final Logger logger=LoggerFactory.getLogger(JwtAuthenticationEntryPoint.class);
	
	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException e) throws IOException, ServletException {
		// TODO Auto-generated method stub
		logger.error("unauthorized error. Message -{}",e.getMessage());
		response.sendError(response.SC_UNAUTHORIZED,e.getMessage());
	}
	
	
}
