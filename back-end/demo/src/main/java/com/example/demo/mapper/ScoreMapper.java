package com.example.demo.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.example.demo.vo.ScoreVO;

@Mapper
public interface ScoreMapper {

	public List<ScoreVO> fetchScoreById(String id);

	public void deleteBan(Map<String, Object> map);

	public void SubmitScore(ScoreVO score);

	public List<ScoreVO> DoneList(Map<String, Object> map);

}
