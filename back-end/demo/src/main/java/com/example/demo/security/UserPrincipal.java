package com.example.demo.security;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;
import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.example.demo.vo.UserVO;


//
public class UserPrincipal implements UserDetails {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String username;// id
	private String password;
	private List<GrantedAuthority> authorities;
	
	public void setUsername(String N) {
		this.username=N;
	}
	public void setPassword(String password) {
		this.password=password;
	}
	public void setAuthorities(String au) {
		List<GrantedAuthority> authorities=new ArrayList<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority(au));
		this.authorities=authorities;
		

}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.authorities;
	}
	@Override
	public String getPassword() {
		return password;
	}
	@Override
	public String getUsername() {
		return username;
	}
	//계정이 만료되지 않았는가
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	//계정이 잠기지 않았는가
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}
	//패스워드 만료되지 않았는가
	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}
	//계정이 활성화 되었는가
	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
}
