import React, {Component} from 'react';
import axios from 'axios';


export default class EditOmr extends Component{


    state = {
        omr:this.props.location.state.omr,
        user:this.props.location.state.user
    }
   
componentDidMount(props){
    

    
} 




update=(e,omr)=>{
    e.preventDefault();
    axios.get("http://localhost:8080/omr/cod/"+omr.cod+'/ban/'+omr.ban+'/num/'+omr.num)
    .then(res=>{
        console.log("update get success");
        this.props.push('/update/omr');
    })
    .catch(err=>{
        console.log('update get fail',err);
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


render(){

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
<legend style={{ borderTop:"3px solid #56cc9d",paddingTop:"25px",borderBottom:"1px solid gray"}}> 문제 수정</legend>
<table class="table table-hover">
  <thead>
      <tr>
      <th style={{textAlign:"center"}}>숙제명:</th>
      <th >{this.state.omr.title}</th>
      <th>문제 갯수:</th>
      <th style={{paddingBottom:"7px"}}>
    <select multiple="" class="form-control" id="select" style={{width:"120px",height:"35px"}}>

        {[...Array(30)].map((n, index) => {
            if(index+1==count)
                return <option selected="selected">{index+1}</option>
            else
                return <option>{index+1}</option>
        })}

    </select>
    </th>
      </tr>
      </thead>
  <tbody>
      <td>
      <table class="table table-hover">
          <thead>
              <tr>
                  <th>번호</th>
                  <th>답</th>
              </tr>
          </thead>
          <tbody>
             
          </tbody>
      </table>
      </td>
  </tbody>
</table>
</div>

   
    
    ); 
}


}