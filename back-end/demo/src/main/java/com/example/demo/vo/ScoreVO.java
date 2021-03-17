package com.example.demo.vo;

import java.time.LocalDate;
import java.util.Date;

import lombok.Data;

@Data
public class ScoreVO {

	int num;
	String ban;
	int cod;
	String title;
	String ans_num;
	String score;
	String ans;
	String id;
	LocalDate expired;
	LocalDate sub_time;
}
