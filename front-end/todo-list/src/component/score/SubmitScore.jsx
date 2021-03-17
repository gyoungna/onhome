import React, {Component} from 'react';
import axios from 'axios';


export default class SubmitScore extends Component{


    state = {
        omr:this.props.location.state.omr,
        user:this.props.location.state.user,
        score:{
            num:this.props.location.state.omr.num,
            ban:this.props.location.state.omr.ban,
            cod:this.props.location.state.omr.cod,
            title:this.props.location.state.omr.title,
            ans_num:this.props.location.state.omr.cocount,
            score:'',
            ans:'',
            id:this.props.location.state.user.id,
            expired:this.props.location.state.omr.expired,
            sub_time:''

        }
        
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

submit=(e,arr)=>{
        var temp=arr[0]+'';//ans string
        var correct=this.state.omr.co;//correct 배열
        var score=(arr[0]===correct[0])?'1':'0';//score string
            for(var i=1;i<arr.length;i++){
                
                temp+=';'+arr[i];
                score+=((arr[i]===correct[i])?';1':';0');

        }
        var date=new Date();
        date.setDate(date.getDate()+1);
        this.setState({
            score:{
                ...this.state.score,
                ans:temp,
                score:score,
                sub_time:date,
            }
        },()=>{
            axios.post("http://localhost:8080/score",this.state.score).then(res=>{
                alert('숙제가 제출되었습니다.');
               var today=new Date();
                this.setState({
                    score:{
                        ...this.state.score,
                        sub_time:today
                    }
                },()=>{
                    this.props.history.push({
                        pathname:"/check/score",
                        state:{score:this.state.score, user:this.state.user}
                    });
                })
              
            })
            .catch(err=>{
                console.log('post score fail',err);
            })
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

    let arr = Array.from({length: this.state.omr.count.length}, () => null); 
    
    return(
    <div style={hStyle}>
    <h1 style={{ padding:"20px",textAlign:"center"}}>
    숙제 In
    </h1 >
    <ul class="nav nav-pills" style={{paddingBottom:"5px"}}>
        <li class="nav-item" ><a class="nav-link active" href="#" onClick={(e)=>{e.preventDefault(); this.props.history.push('/student');}} >학생 페이지</a></li>
    <div style={{position:"absolute", right:"10px"}}>
        <li style={{display:"inline-block"}}><small class="form-text text-muted " style={{position:"relative", paddingTop:"3px"}}>안녕하세요 {this.state.user.id}님!!</small></li>
        <li class="nav-item" style={{display:"inline-block"}}><a class="nav-link"  href="#" onClick={this.editUser}>회원 정보 수정</a></li>
        <li class="nav-item" style={{display:"inline-block"}}><a class="nav-link" href="#" onClick={this.logout}>로그아웃</a></li>
    </div>
    </ul>
<legend style={{ borderTop:"3px solid #56cc9d",paddingTop:"25px",borderBottom:"1px solid gray"}}>숙제 제출</legend>
<table class="table table-hover">
      <tr>
      <td style={{display:"inline-block",paddingTop:"18px",paddingBottom:"0px",width:"400px"}}>숙제명: &nbsp; {this.state.omr.title}</td>
      <td style={{width:"400px"}}></td>
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
             {this.state.omr.count.map((count,index)=>{
                 while(index<15){
                     return  (<tr>
                         <td>{count}</td>
                         <td><input type="text" class="form-control"  value={arr[index]} onChange={(e)=>{this.onChange(e,arr,index)}}/></td>
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
             {this.state.omr.count.map((count,index)=>{
                 while(index>=15){
                     return  (<tr>
                       <td>{count}</td>
                         <td><input type="text" class="form-control"  value={arr[index]} onChange={(e)=>{this.onChange(e,arr,index)}}/></td>
                     </tr>);
                 }

             })}
          </tbody>
      </table>
      </td>
  </tr>
</table>

<button type="button" style={{textAlign:"center"}} class="btn btn-primary disabled btn-sm" onClick={(e)=>{this.submit(e,arr)}}>제출</button>&nbsp;

</div>

   
    
    ); 
}


}