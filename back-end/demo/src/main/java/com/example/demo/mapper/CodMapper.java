package com.example.demo.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CodMapper {
	
	
	public void deleteCod(int cod);
	public Integer fetchCod(int cod);
	public void insertCod(int cod);

}
