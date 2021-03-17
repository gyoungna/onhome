package com.example.demo.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.vo.UserVO;

@Mapper
public interface UserMapper {
	  public void insertUser(UserVO user);
	  public UserVO fetchUserByID(String username);
	  public void updateUser(UserVO user);
	  public void deleteUser(String id);
	  public List<UserVO> userAuthList(String auth);
	public List<UserVO> StudentList(Map<String, Object> map);
	public List<UserVO> UserList(Map<String, Object> map);

}
