package com.example.demo.vo;

import java.time.LocalDate;
import java.util.Date;

import lombok.Data;

@Data
public class OmrVO {
	
	String correct;
	int num;
	String ban;
	int cod;
	String title;
	String cocount;	
	LocalDate expired;
	
}
