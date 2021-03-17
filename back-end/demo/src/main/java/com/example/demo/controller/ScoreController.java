package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.mapper.ScoreMapper;
import com.example.demo.vo.OmrVO;
import com.example.demo.vo.ScoreVO;

@CrossOrigin(origins="*", maxAge=3600)
@RestController
@RequestMapping("/score")
public class ScoreController {
	
	@Autowired
	ScoreMapper ScoreMapper;
	

	@GetMapping("/id/{id}")
	@ResponseBody//user가져오기
	public List<ScoreVO> fetchScoreById(@PathVariable String id){
		return ScoreMapper.fetchScoreById(id);
		
	}
	
	@GetMapping("/cod/{cod}/ban/{ban}/num/{num}")
	@ResponseBody//user가져오기
	public List<ScoreVO> DoneList(@PathVariable int cod,@PathVariable String ban,@PathVariable int num){
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("cod",cod);
		map.put("ban", ban);
		map.put("num",num);
		
		return ScoreMapper.DoneList(map);
		
	}
	
	@DeleteMapping("/cod/{cod}/ban/{ban}")
	public void deleteBan(@PathVariable int cod, @PathVariable String ban) {
		Map<String, Object> map=new HashMap<String, Object>();
		map.put("cod",cod);
		map.put("ban", ban);
		System.out.println("해당 반 score 삭제");
		ScoreMapper.deleteBan(map);
		
	}
	
	@PostMapping
	public void SubmitScore(@RequestBody ScoreVO score) {
		
		
		ScoreMapper.SubmitScore(score);
	}

}
