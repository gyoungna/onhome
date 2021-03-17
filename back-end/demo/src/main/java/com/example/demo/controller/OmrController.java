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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.mapper.OmrMapper;
import com.example.demo.vo.OmrVO;
import com.example.demo.vo.UserVO;


@CrossOrigin(origins="*", maxAge=3600)
@RestController
@RequestMapping("/omr")
public class OmrController {

		@Autowired
		OmrMapper omrMapper;
		

		
		
		
		
		@GetMapping("/cod/{cod}/ban/{ban}")
		@ResponseBody//user가져오기
		public List<OmrVO> fetchUserById(@PathVariable int cod, @PathVariable String ban){
			
			Map<String, Object> map=new HashMap<String, Object>();
			map.put("cod",cod);
			map.put("ban", ban);
			

			List<OmrVO> temp= omrMapper.Omrlist(map);
			for(int i=0;i<temp.size();i++) {
				temp.get(i).setCo();
				temp.get(i).setCount();
				//System.out.println(temp.get(i).getExpired());
			}
			
			return temp;
		}
		
		@DeleteMapping("/cod/{cod}/ban/{ban}/num/{num}")
		public void deleteOmr(@PathVariable int cod, @PathVariable String ban,@PathVariable int num) {
			Map<String, Object> map=new HashMap<String, Object>();
			map.put("cod",cod);
			map.put("ban", ban);
			map.put("num",num);
			
			omrMapper.deleteOmr(map);
			
		}
		
		@DeleteMapping("/cod/{cod}/ban/{ban}")
		public void deleteBan(@PathVariable int cod, @PathVariable String ban) {
			Map<String, Object> map=new HashMap<String, Object>();
			map.put("cod",cod);
			map.put("ban", ban);
			System.out.println("해당 반 omr 삭제");
			omrMapper.deleteBan(map);
			
		}
		
		@GetMapping("/cod/{cod}/ban/{ban}/num/{num}")
		public OmrVO getOmr(@PathVariable int cod, @PathVariable String ban,@PathVariable int num) {
			Map<String, Object> map=new HashMap<String, Object>();
			map.put("cod",cod);
			map.put("ban", ban);
			map.put("num",num);
			
			
			OmrVO omr= omrMapper.getOmr(map);
			omr.setCo();
			return omr;
			
		}
		
		@PutMapping("/cod/{cod}/ban/{ban}/num/{num}")
		public void updateOmr(@PathVariable int cod, @PathVariable String ban,@PathVariable int num,
				@RequestBody OmrVO omr) {
			
			Map<String, Object> map=new HashMap<String, Object>();
			map.put("cod",cod);
			map.put("ban", ban);
			map.put("num",num);
			map.put("correct", omr.getCorrect());
			map.put("cocount", omr.getCocount());
			map.put("expired", omr.getExpired());
			System.out.println(omr.getExpired());

			omrMapper.updateOmr(map);
		}
		
		@PostMapping
		public void insertOmr(@RequestBody OmrVO omr) {
			System.out.println(omr);
			
			omrMapper.insertOmr(omr);
		}
		
		
}
