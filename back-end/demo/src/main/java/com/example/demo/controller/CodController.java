package com.example.demo.controller;

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

import com.example.demo.mapper.CodMapper;
import com.example.demo.vo.CodVO;

@CrossOrigin(origins="*", maxAge=3600)
@RestController
@RequestMapping("/cod")
public class CodController {
	
	CodMapper CodMapper;
	
	@Autowired
	public CodController(CodMapper CodMapper)
	{
		this.CodMapper=CodMapper;
	}
	
	@DeleteMapping("/{cod}")//반 삭제(코드 삭제)
	public void deleteCod(@PathVariable int cod) {
		CodMapper.deleteCod(cod);
		
	}
	@GetMapping("/{cod}")
	@ResponseBody//코드 가져오기
	public Integer fetchCod(@PathVariable int cod){
		//System.out.println(CodMapper.fetchCod(cod));
		return CodMapper.fetchCod(cod);
	}
	
	@PostMapping//코드 생성
	public void insertCod(@RequestBody CodVO vo) {
		
			int cod=vo.getCod();
			CodMapper.insertCod(cod);
			
	}

}
