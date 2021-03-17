import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

export default class EditOmr extends Component{


    state = {
        omr:this.props.location.state.omr,
        user:this.props.location.state.user,
        count:this.props.location.state.omr.count,
        co:this.props.location.state.omr.co
    }
   




update=(e)=>{
    e.preventDefault();
    var temp1=this.state.count[0];
    var temp2=this.state.co[0];
    for(var i=1;i<this.state.count.length;i++){
        temp1+=';'+this.state.count[i];
        temp2+=';'+this.state.co[i];
    }



    var date=this.state.omr.expired;
    date=moment(date).toDate();
    date.setDate(date.getDate()+1);

    this.setState({
        omr:{
            ...this.state.omr,
            correct:temp2,
            cocount:temp1,
            expired:date
            
        }
    },()=>{
    axios.put("http://localhost:8080/omr/cod/"+this.state.omr.cod+'/ban/'+this.state.omr.ban+'/num/'+this.state.omr.num,this.state.omr)
    .then(res=>{
        alert('수정되었습니다.');
        this.props.history.push('/teacher');
    })
    .catch(err=>{
        console.log('update fail',err);
    })
})


}

    

logout=(e)=>{
    e.preventDefault();//a태그의 href사용하지말고 onClick을 이용하도록 하는 것 
    localStorage.removeItem('token');
    localStorage.removeItem('authenticatedUser');
    localStorage.removeItem('auth');

    this.props.history.push('/main');
}

   
editUser=(e)=>{//회원 정보 수정
    e.preventDefault();//a태그의 href사용하지말고 onClick을 이용하도록 하는 것 

    this.props.history.push('/edit');
}

selectChanged=(e)=>{
   if(e.target.value<=this.state.count.length){
       this.setState({
           count:this.state.count.slice(0,e.target.value),
           co:this.state.co.slice(0,e.target.value)
       })
    }
    else{
        const arr=Array.from({length:e.target.value-this.state.count.length},()=>null);

        this.setState({
            count:this.state.count.concat(arr),
            co:this.state.co.concat(arr)
        })
    }
    
   }

   CountChanged=(e, index)=>{
       this.setState({
           count:this.state.count.map((count,idx)=>
               idx===index?(e.target.value):count
           
           )
       })
   }

   CoChanged=(e,index)=>{
       this.setState({
           co:this.state.co.map((co, idx)=>
           idx===index?(e.target.value):co
           )
       })
   }
   onDateChange=date=>{
 
    this.setState({
        omr:{
            ...this.state.omr,
            expired:date
        }
    },()=>{
        console.log(this.state.omr.expired);
    })
    
}

render(){
    console.log(typeof this.state.omr.expired);
    const hStyle={
        position:"absolute",
        width:"800px",
        height:"100px",
        top:"10%",
        left:"50%",
        transform:"translate(-50%,-50%)",

    }

   
    var count=this.props.location.state.omr.co.length;

    return(
<div style={hStyle}>
<h1 style={{ padding:"20px",textAlign:"center"}}>
숙제 In
</h1 >
<ul class="nav nav-pills" style={{paddingBottom:"5px"}}>
<li class="nav-item" ><a class="nav-link active" href="#" onClick={(e)=>{e.preventDefault(); this.props.history.push('/teacher');}} >선생님 페이지</a></li>
<div style={{position:"absolute", right:"10px"}}>
<li style={{display:"inline-block"}}><small class="form-text text-muted " style={{position:"relative", paddingTop:"3px"}}>안녕하세요 {this.props.location.state.user.id}선생님!!</small></li>
<li class="nav-item" style={{display:"inline-block"}}><a class="nav-link"  href="#" onClick={this.editUser}>회원 정보 수정</a></li>
<li class="nav-item" style={{display:"inline-block"}}><a class="nav-link" href="#" onClick={this.logout}>로그아웃</a></li>
</div>
</ul>
<legend style={{ borderTop:"3px solid #56cc9d",paddingTop:"25px",borderBottom:"1px solid gray"}}> 문제 확인 및 수정</legend>
<table class="table table-hover">
      <tr>
      <td style={{paddingTop:"18px",paddingBottom:"0px",width:"400px"}}>숙제명: &nbsp;{this.state.omr.title}</td>
      <td style={{width:"400px"}}>
      <div style={{display:"inline-block"}}>문제 개수: &nbsp;</div>
      <select multiple="" class="form-control" id="select" onChange={this.selectChanged} style={{width:"100px",height:"35px",display:"inline-block"}}>

        {[...Array(30)].map((n, index) => {
            if(index+1==count)
                return <option selected="selected">{index+1}</option>
            else
                return <option>{index+1}</option>
        })}

    </select>
    &nbsp;
    <DatePicker
    style={{display:"inline-block",width:"80px", height:"35px"}}
    locale={ko}
    dateFormat="yyyy-MM-dd"
    className="input-datepicker form-control form-control-sm"
    minDate={new Date()}
    closeOnScroll={true}
    placeholderText="제출 기한 선택"
    selected={moment(this.state.omr.expired).toDate()}//json에서 올때 오브젝트으로 옴 그래서 date으로 변환시켜줘야함
    onChange={this.onDateChange}
    />
    </td>
      </tr>
 <tr >
      <td rowSpan="15">
      <table class="table table-hover" style={{width:"350px"}}>
          <thead>
              <tr>
                  <th>번호</th>
                  <th>답</th>
              </tr>
          </thead>
          <tbody>
             {this.state.count.map((count,index)=>{
                 while(index<15){
                     return  (<tr>
                         <td><input type="text" class="form-control"  value={count} onChange={(e)=>{this.CountChanged(e,index)}}/></td>
                         <td><input type="text" class="form-control"  value={this.state.co[index]} onChange={(e)=>{this.CoChanged(e,index)}}/></td>
                     </tr>);
                 }

             })}
          </tbody>
      </table>
      </td>
      <td rowSpan="15" >
      <table class="table table-hover" >
          <thead>
              <tr>
                  <th>번호</th>
                  <th>답</th>
              </tr>
          </thead>
          <tbody>
             {this.state.count.map((count,index)=>{
                 while(index>=15){
                     return  (<tr>
                         <td><input type="text" class="form-control"  value={count} onChange={(e)=>{this.CountChanged(e,index)}} /></td>
                         <td><input type="text" class="form-control"  value={this.state.co[index]} onChange={(e)=>{this.CoChanged(e,index)}}/></td>
                     </tr>);
                 }

             })}
          </tbody>
      </table>
      </td>
  </tr>
</table>
<div style={{textAlign:"center"}}>
<button type="button" style={{display:"inline-block"}} class="btn btn-primary disabled btn-sm" onClick={this.update}>수정</button>&nbsp;
<button type="button" style={{display:"inline-block"}} class="btn btn-primary disabled btn-sm" onClick={(e)=>{e.preventDefault(); this.props.history.push('/teacher');}}>돌아가기</button>
</div>
</div>

   
    
    ); 
}


}