import React, {Component} from 'react';
import axios from 'axios';


export default class CheckScore extends Component{

    
    state = {
        user:this.props.location.state.user,
        score:this.props.location.state.score,
        omr:this.props.location.state.omr,
        rate:[]
    }

        
   
    componentDidMount(props){
        this.setupAxiosInterceptors();

        if(this.state.score){
            this.ready();
        }


       
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

    ready(){
        var ans_num=this.state.omr.cocount.split(';');
        var rate=Array.from({length: ans_num.length}, () => 0.0);

       this.state.score.map((score,index)=>{//한 사람의 점수 
           var temp=score.score.split(';');//점수 각각
           for(var i=0;i<temp.length;i++){
               rate[i]+=temp[i]/(this.state.score.length);
           }
       })

       this.setState({
        rate:rate
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





okay=(e)=>{


    axios.get("http://localhost:8080/omr/cod/"+this.state.omr.cod+"/ban/"+this.state.omr.ban+"/num/"+this.state.omr.num).then(res=>{
            this.props.history.push({
                pathname:"/check/submission",
                state:{user:this.state.user, omr:res.data}
            });
 
    })
}



render(){
    const hStyle={
        position:"absolute",
        width:"800px",
        height:"100px",
        top:"10%",
        left:"50%",
        transform:"translate(-50%,-50%)",

    }

    let correct=this.state.omr.correct.split(';');
    let ans_count=this.state.omr.cocount.split(';');


    return(
    <div style={hStyle}>
    <h1 style={{ padding:"20px",textAlign:"center"}}>
    숙제 In
    </h1 >
    <ul class="nav nav-pills" style={{paddingBottom:"5px"}}>
        <li class="nav-item" ><a class="nav-link active" href="#" onClick={(e)=>{ this.props.history.push('/teacher');}} >선생님 페이지</a></li>
    <div style={{position:"absolute", right:"10px"}}>
        <li style={{display:"inline-block"}}><small class="form-text text-muted " style={{position:"relative", paddingTop:"3px"}}>안녕하세요 {this.state.user.id}선생님!!</small></li>
        <li class="nav-item" style={{display:"inline-block"}}><a class="nav-link"  href="#" onClick={this.editUser}>회원 정보 수정</a></li>
        <li class="nav-item" style={{display:"inline-block"}}><a class="nav-link" href="#" onClick={this.logout}>로그아웃</a></li>
    </div>
    </ul>
<legend style={{ borderTop:"3px solid #56cc9d",paddingTop:"25px",borderBottom:"1px solid gray"}}>오답률 확인</legend>
<table class="table table-hover">
      <tr>
      <td style={{display:"inline-block",paddingTop:"18px",paddingBottom:"0px",width:"400px"}}>숙제명: &nbsp; {this.state.omr.title}</td>
      <td style={{width:"400px"}}></td>
      </tr>
 <tr >
      <td rowSpan="15">
      <table class="table table-hover" style={{width:"400px"}}>
          <thead>
              <tr>
                  <th>번호</th>
                  <th>답</th>
                  <th>오답률</th>
              </tr>
          </thead>
          <tbody>
             {ans_count.map((ans_num,index)=>{

                 while(index<15){

                     return  (
                     <tr>
                         <td>{ans_num}</td>
                         <td><input type="text" class="form-control"  value={correct[index]}  readOnly/></td>
                         <td>{this.state.rate[index]*100}%</td>
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
                  <th>오답률</th>
              </tr>
          </thead>
          <tbody>
             {ans_count.map((ans_num,index)=>{
                 while(index>=15){
                     return  (
                     <tr>
                         <td>{ans_num}</td>
                         <td><input type="text" class="form-control"  value={correct[index]}  readOnly/></td>
                         <td>{this.state.rate[index]*100}%</td>
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