package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.demo.security.CustomUserDetailsService;
import com.example.demo.security.JwtAuthenticationEntryPoint;
import com.example.demo.security.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity//웹보안
@EnableGlobalMethodSecurity(//메소드레벨 보안
		securedEnabled=true,
		jsr250Enabled=true,
		prePostEnabled=true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	

	CustomUserDetailsService customUserDetailsService;
	//사용자의 세부사항을 가져오는 서비스
		
	//인증이 이루어지지 않은 상태서 접근 시 401오류
	private JwtAuthenticationEntryPoint unauthorizeHandler;
	
	private JwtAuthenticationFilter jwtAuthenticationFilter;
	
	@Autowired
	public SecurityConfig(CustomUserDetailsService customUserDetailsService,JwtAuthenticationEntryPoint unauthorizeHandler,
			JwtAuthenticationFilter jwtAuthenticationFilter) {
		this.customUserDetailsService=customUserDetailsService;
		this.unauthorizeHandler=unauthorizeHandler;
		this.jwtAuthenticationFilter=jwtAuthenticationFilter;
	}
	
	
	//AuthenticationManagerBuilder: 사용자 인증하는 곳
	public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception{
		authenticationManagerBuilder
			.userDetailsService(customUserDetailsService)
			.passwordEncoder(passwordEncoder());
		
	}
	
	//사용자 인증
	@Bean(BeanIds.AUTHENTICATION_MANAGER)
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	
	
	//PasswordEncoder
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
	
	@Override
	protected void configure(HttpSecurity http) throws Exception{
		http
		.cors()
			.and()
		.csrf()
			.disable()//csrf 필터 비활성화(why? 다른 도메인에서 post요청시 csrf 공격 방어를 위해 403오류(token만들어줘야함)
		.exceptionHandling()
			.authenticationEntryPoint(unauthorizeHandler)
			.and()
		.sessionManagement()
			.sessionCreationPolicy(SessionCreationPolicy.STATELESS)//세션을 생성하지도 않고 기존의 것을 사용하지도 않음(ㄹㅇ STATELESS)
			.and()
		.authorizeRequests()
			.antMatchers("/authenticate","/users/**","/cod/*","/users","/cod").permitAll() 
			.anyRequest().authenticated();
			//정적리소스,몇몇 api, authenticate 에대한 접근은 모두에게 허용
			//그 외에 대해서는 인증된 사용자에게만
			
		http.addFilterBefore(jwtAuthenticationFilter,UsernamePasswordAuthenticationFilter.class);
		//jwtfilter가 UsernamePasswordAuthenticationFilter보다 앞에 붙음
	}
}

