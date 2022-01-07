package com.example.demo.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;


//request 시 jwt유호성 검사 후, 관련 사용자를 로드하여 spring security에 전달 

//로그인-AuthController-인증- 성공시-jwt 생성 후 전달/ 실패시-JwtAuthenticationEntryPoint
//로그인 안함 - 접근가능권한-접근 가능/ 접근 불가능 권한-JwtAuthenticationEntryPoint
//로그인 후 jwt갖고 접근- JwtAuthenticationFilter에서 jwt 유효성 검사후 security에 정보 전달- security 인증,인가
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	private jwtTokenProvider tokenProvider;
	
	
	private CustomUserDetailsService service;
	
	private static final Logger logger=LoggerFactory.getLogger(JwtAuthenticationFilter.class);
	
	
	@Autowired
	public JwtAuthenticationFilter(jwtTokenProvider tokenProvider,CustomUserDetailsService service) {
		this.tokenProvider=tokenProvider;
		this.service=service;
		
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			String jwt=getJwtFromRequest(request);//jwt가져오기
			
			//jwt 유효성을 검사후 spring security context에 저장 
			if(StringUtils.hasText(jwt)&&tokenProvider.validateToken(jwt)) {
				String id=tokenProvider.getIdFromJWT(jwt);
				UserDetails details=service.loadUserByUsername(id);
				UsernamePasswordAuthenticationToken auth=new UsernamePasswordAuthenticationToken(details,null,details.getAuthorities());
				auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				
				SecurityContextHolder.getContext().setAuthentication(auth);
			}
		}catch(Exception ex) {
			logger.error("coulde not set user auth in security context",ex);
		}
		
		filterChain.doFilter(request, response);
		
	}
	
	//header에서 jwt추출
	private String getJwtFromRequest(HttpServletRequest request) {
		String bearerToken=request.getHeader("Authorization");
		if(StringUtils.hasText(bearerToken) &&bearerToken.startsWith("Bearer ")) {
			return bearerToken.substring(7,bearerToken.length());
		}
		return null;
	}
	
}
