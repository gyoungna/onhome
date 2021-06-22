import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';

export default class CheckScore extends Component{


    state = {
        user:this.props.location.state.user,
        score:this.props.location.state.score

    }

        
   
    componentDidMount(props){
        this.setupAxiosInterceptors();

       
    }
    
    setupAxiosInterceptors(){
        axios.interceptors.request.use(
            config=>{
                const token=window.localStorage.getItem('token');
                if(token){
                    config.headers['Authorization']='Bearer '+ token;
                }
                return config;
            },
            
        )

    }// 이후의 모든 request에 token이 담겨져서 보내짐//모든 request를 보내기전에 intecept, 그래서  localstorge를 삭제하면 아무것도 보내지지 않음




    

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



onChange=(e,arr,index)=>{
    arr[index]=e.target.value;

}

okay=(e)=>{
    if(this.state.user.auth=='STU')
    this.props.history.push('/student');
    else{

        axios.get("http://localhost:8080/omr/cod/"+this.state.score.cod+"/ban/"+this.state.score.ban+"/num/"+this.state.score.num).then(res=>{
            this.props.history.push({
                pathname:"/check/submission",
                state:{user:this.state.user, omr:res.data}
            });
        })
       
    }
}


render(){
    console.log('check');
    const hStyle={
        position:"absolute",
        width:"800px",
        height:"100px",
        top:"10%",
        left:"50%",
        transform:"translate(-50%,-50%)",

    }
    let answer=this.state.score.ans.split(';');
    let ans_count=this.state.score.ans_num.split(';');
    let score=this.state.score.score.split(';');
    var auth='';
    var etc='';
    if(this.state.user.auth=='STU'){
        auth='학생';
        etc='님';
    }
    else{
        auth='선생님';
        etc='선생님';
    }
    var date=this.state.score.sub_time;
    moment(date).toDate();
    date=moment(date).format('YYYY-MM-DD');

    return(
    <div style={hStyle}>
    <h1 style={{ padding:"20px",textAlign:"center"}}>
    onHome
    </h1 >
    <ul class="nav nav-pills" style={{paddingBottom:"5px"}}>
        <li class="nav-item" ><a class="nav-link active" href="#" onClick={(e)=>{if(this.state.user.auth=='STU')this.props.history.push('/student');else this.props.history.push('/teacher');}} >{auth} 페이지</a></li>
    <div style={{position:"absolute", right:"10px"}}>
        <li style={{display:"inline-block"}}><small class="form-text text-muted " style={{position:"relative", paddingTop:"3px"}}>안녕하세요 {this.state.user.id}{etc}!!</small></li>
        <li class="nav-item" style={{display:"inline-block"}}><a class="nav-link"  href="#" onClick={this.editUser}>회원 정보 수정</a></li>
        <li class="nav-item" style={{display:"inline-block"}}><a class="nav-link" href="#" onClick={this.logout}>로그아웃</a></li>
    </div>
    </ul>
<legend style={{ borderTop:"3px solid #56cc9d",paddingTop:"25px",borderBottom:"1px solid gray"}}>숙제 오답확인 </legend>
<table class="table table-hover">
      <tr>
      <td style={{display:"inline-block",paddingTop:"18px",paddingBottom:"0px",width:"400px"}}>숙제명: &nbsp; {this.state.score.title}</td>
      <td style={{width:"400px"}}> id:{this.state.score.id}&nbsp; /&nbsp; 제출시간:{date}</td>
      </tr>
 <tr >
      <td rowSpan="15">
      <table class="table table-hover" style={{width:"350px"}}>
          <thead>
              <tr>
                  <th>번호</th>
                  <th>답</th>
                  <th>오답</th>
              </tr>
          </thead>
          <tbody>
             {ans_count.map((ans_num,index)=>{

                 while(index<15){
                    var clas='';
                    var ox=''
                    if(score[index]=='1'){
                        ox='o';
                    }
                    else{
                        clas="table-warning";
                        ox='x';
                    }
                     return  (
                     <tr class={clas}>
                         <td>{ans_num}</td>
                         <td><input type="text" class="form-control"  value={answer[index]}  readOnly/></td>
                         <td>{ox}</td>
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
                  <th>오답</th>
              </tr>
          </thead>
          <tbody>
             {ans_count.map((ans_num,index)=>{
                 while(index>=15){
                    var clas='';
                    var ox=''
                    if(score[index]=='1'){
                        ox='o';
                    }
                    else{
                        clas="table-warning";
                        ox='x';
                    }
                     return  (
                     <tr class={clas}>
                         <td>{ans_num}</td>
                         <td><input type="text" class="form-control"  value={answer[index]}  readOnly/></td>
                         <td>{ox}</td>
                     </tr>);
                 }

             })}
          </tbody>
      </table>
      </td>
  </tr>
</table>

<button type="button" style={{textAlign:"center"}} class="btn btn-primary disabled btn-sm" onClick={this.okay}>확인</button>

</div>

   
    
    ); 
}


}