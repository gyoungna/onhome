package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Mail.MailSendService;
import com.example.demo.mapper.UserMapper;
import com.example.demo.vo.UserVO;

@CrossOrigin(origins="*", maxAge=3600)
@RestController
@RequestMapping("/users")
public class UserController {

		UserMapper userMapper;
		
		PasswordEncoder passwordEncoder;
				
		MailSendService mss;
		
		@Autowired
		public UserController(UserMapper userMapper, PasswordEncoder passwordEncoder, MailSendService mss)
		{
			this.userMapper=userMapper;
			this.passwordEncoder=passwordEncoder;
			this.mss=mss;
		}
		
		
		@PostMapping
		@ResponseBody//회원가입
		public String insertUser(@RequestBody UserVO user) {
			String id=user.getId();
			UserVO temp=userMapper.fetchUserByID(id);
			
			if(temp!=null) {
				return "실패";
				
			}
			else {
				user.setPw(passwordEncoder.encode(user.getPw()));
				
				String authKey=mss.sendAuthMail(user.getEmail());
				user.setAuthkey(authKey);
				
				userMapper.insertUser(user);
				
				return "성공";
			}
		} 
		
		
		@GetMapping("/email/{email}/authkey/{authkey}")//이메일 인증
		 public String signUpConfirm(@PathVariable String email,@PathVariable String authkey){
			 
			 UserVO user=userMapper.getUserByEmail(email);
			 //System.out.println("제발ㅜㅜ");
			 
			 if(user.getAuthkey().contentEquals(authkey)) {
				 if(user.getAuth().contentEquals("NOSTU"))
				 {
					 user.setAuth("STU");
					 userMapper.updateUser(user);
					 return "인증되었습니다.";
				 }
				 else if(user.getAuth().contentEquals("NOTEA"))
				 {
					 user.setAuth("TEA");
					 userMapper.updateUser(user);
					 return "인증되었습니다.";
				 }
			 }
			return null;

		}
	
		
		@GetMapping("/auth/{auth}")
		@ResponseBody//auth별 user
		public List<UserVO> userListByAuth(@PathVariable String auth){
			//System.out.println(userMapper.userAuthList(auth));
			return userMapper.userListByAuth(auth);
		}
		
		@GetMapping("/{id}")
		@ResponseBody
		public UserVO fetchUserById(@PathVariable String id){
			
			UserVO user=userMapper.fetchUserByID(id);
			/*if(user!=null&&user.getBan()!=null) {
				user.setBanList();
			}
			*/
			return user;
		}
		
		
		@GetMapping("/email/{email}")
		@ResponseBody
		public UserVO getUserByEmail(@PathVariable String email){
			
			UserVO user=userMapper.getUserByEmail(email);
			

			return user;
		}
		
		@GetMapping("/cod/{cod}/ban/{ban}")
		public List<UserVO> UserList(@PathVariable int cod,@PathVariable String ban)
		{
			System.out.println("특정 반 학생들 가져오기");
			Map<String, Object> map=new HashMap<String, Object>();
			map.put("cod",cod);
			map.put("ban", ban);
			
			//System.out.println(userMapper.UserList(map));
			return userMapper.UserList(map);
		}
		
		

		
		@DeleteMapping("/{id}")
		public void deleteUser(@PathVariable String id) {
			userMapper.deleteUser(id);
			
		}
		
		@PutMapping("/{id}")
		public void updateUser(@PathVariable String id, @RequestBody UserVO user) {
			
			UserVO temp=userMapper.fetchUserByID(user.getId());
			if(!temp.getPw().contentEquals(user.getPw())) {//비밀번호 변경시 암호화..
				user.setPw(passwordEncoder.encode(user.getPw()));
			}
			

			//System.out.println(user.getBan());

			userMapper.updateUser(user);
		}
		
		
		@PutMapping()//반삭제, 유저들 반 바꾸기 
		public void updateBan(@RequestBody List<UserVO> userlist) {
			
			System.out.println("삭제할 유저들 반바꾸기=>null");
			for(int i=0;i<userlist.size();i++) {
				//System.out.println(userlist.get(i));
				userlist.get(i).setBan("");
				userMapper.updateUser(userlist.get(i));
			}
		}
		
		
		@GetMapping("/{id}/pw/{pw}")
		@ResponseBody
		public boolean EncodePw(@PathVariable String id,@PathVariable String pw) {
			
			//Map<String, Boolean> map=new HashMap<String,Boolean>();
			UserVO temp=userMapper.fetchUserByID(id);
			boolean result=passwordEncoder.matches(pw, temp.getPw());
			
			return result;
		}
		
		@GetMapping("/auth/{auth}/cod/{cod}")
		@ResponseBody
		public List<UserVO> StudentList(@PathVariable String auth,@PathVariable int cod){
			Map<String, Object> map=new HashMap<String, Object>();
			map.put("auth",auth);
			map.put("cod", cod);
			return userMapper.StudentList(map);
		}
}
