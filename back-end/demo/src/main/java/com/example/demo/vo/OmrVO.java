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
	String co[];//문제
	String cocount;
	String count[];//문제번호
	LocalDate expired;
	
	 
		public void setCo() {
			String[] splited=correct.split(";");
			co=new String[splited.length];
			for(int i=0;i<splited.length;i++) {
				co[i]=splited[i];
				
			}
		}
		public String[] getCo() {
			return this.co;
		}
		public void setCount() {
			String[] splited=cocount.split(";");
			count=new String[splited.length];
			for(int i=0;i<splited.length;i++) {
				count[i]=splited[i];
				
			}
		}
		public String[] getCount() {
			return this.count;
		}

}
