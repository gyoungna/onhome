package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer{
	/*
	private final long MAX_AGE_SECS=3600;
	
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")//cors를 적용할 서버 url 패턴 지정
		.allowedOrigins("*")//자원 공유를 허락할 요청 origin 지정
		.allowedMethods("HEAD","OPTIONS","GET","POST","PUT","PATCH","DELETE")//허락할 method
		.maxAge(MAX_AGE_SECS);//pre-flight request 캐싱시간
	}
	*/
}
