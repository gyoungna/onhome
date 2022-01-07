package com.example.demo.security;

import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

//jwt 생성, request시 header안의 jwt 유효성 검증
@Component
public class jwtTokenProvider{
	
	private static final Logger logger=LoggerFactory.getLogger(jwtTokenProvider.class);

	@Value("${app.jwtSecret}")
	private String jwtSecret;
	
	@Value("${app.jwtExpirationInMs}")
	private int jwtExpirationInMs;
	
	public String generateToken(Authentication authentication) {
		UserPrincipal userprincipal=(UserPrincipal) authentication.getPrincipal();
		Date now=new Date();
		Date expiryDate=new Date(now.getTime()+jwtExpirationInMs);
		
		
		return Jwts.builder()
				.setSubject(userprincipal.getUsername())
				.setIssuedAt(new Date())
				.setExpiration(expiryDate)
				.signWith(SignatureAlgorithm.HS512, jwtSecret)
				.compact();
	}
	
	public String getIdFromJWT(String token) {
		Claims claims=Jwts.parser()
				.setSigningKey(jwtSecret)
				.parseClaimsJws(token)
				.getBody();
		
		return claims.getSubject();
	}
	
	public boolean validateToken(String authToken) {
		try {
			Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
			return true;
		}catch(SignatureException e) {
			logger.error("invalid jwt signature");
		}catch(MalformedJwtException e) {
			logger.error("invalid jwt token");
		}catch(ExpiredJwtException e) {
			logger.error("expired jwt token");
		}catch(UnsupportedJwtException e) {
			logger.error("unsupported jwt token");
		}catch(IllegalArgumentException e) {
			logger.error("jwt claims string is empty");
		}
		return false;
	}




}