import React, {Component} from 'react';
import 'react-bootstrap';
import ApiService from '../../ApiService';
import axios from 'axios';


class AdminComponent extends Component{

    state={
       Notusers:[],
       users:[],
       message:''
    }//this.setState()할때마다 rerendering

    componentDidMount(){
        this.setupAxiosInterceptors();
        this.reload();
        
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

  
    
    reload=()=>{
        ApiService.loadAuth('NOTEA').then(res=>{
            this.setState({
                Notusers:res.data
            })
        })
        .catch(err=>{
            console.log('load error');
            
        })
        ApiService.loadAuth('TEA').then(res=>{
            this.setState({
                users:res.data
            })
        })
        .catch(err=>{
            console.log('load error');
        })
 
    }
    
    logout=(e)=>{
        e.preventDefault();//a태그의 href사용하지말고 onClick을 이용하도록 하는 것 
        localStorage.removeItem('token');
        localStorage.removeItem('authenticatedUser');
        localStorage.removeItem('auth');

        this.props.history.push('/main');
    }

       
    editUser=(e)=>{
        e.preventDefault();//a태그의 href사용하지말고 onClick을 이용하도록 하는 것 

        this.props.history.push('/edit');
    }


    deleteUser=(e,cod)=>{
        e.preventDefault();
        axios.delete("http://localhost:8080/cod"+'/'+cod)
        .then(res=>{
            console.log("성공");
            this.reload();
        })
        .catch(err=>{
            console.log('delete error');
        })

    }

    updateAuth=(e,user)=>{
        e.preventDefault();
        user.auth='TEA';
        ApiService.updateUser(user)
        .then(res=>{
            console.log('update auth 성공');
            this.reload();
        })
        .catch(err=>{
            console.log('update err');
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
        var Yetlength=this.state.Notusers.length;
        return(
    <div style={hStyle}>
    <h1 style={{ padding:"20px",textAlign:"center"}}>
    onHome
    </h1 >
    <ul class="nav nav-pills" style={{paddingBottom:"5px"}}>
  <li class="nav-item" ><a class="nav-link active" href="#" onClick={(e)=>{e.preventDefault(); this.props.history.push('/admin');}} >관리자 페이지</a></li>
  <div style={{position:"absolute", right:"10px"}}>
  <li style={{display:"inline-block"}}><small class="form-text text-muted " style={{position:"relative", paddingTop:"3px"}}>안녕하세요 관리자님!!</small></li>
  <li class="nav-item" style={{display:"inline-block"}}><a class="nav-link"  href="#" onClick={this.editUser}>회원 정보 수정</a></li>
  <li class="nav-item" style={{display:"inline-block"}}><a class="nav-link" href="#" onClick={this.logout}>로그아웃</a></li>
</div>
</ul>
<legend style={{borderTop:"3px solid #56cc9d",paddingTop:"25px", borderBottom:"1px solid gray"}}>회원관리 </legend>
<div class="alert alert-dismissible alert-primary fade show">
  <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
    회원 신청 {Yetlength}건 있습니다.
</div>
<table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">아이디</th>
      <th scope="col">이름</th>
      <th scope="col">이메일</th>
      <th scope="col">코드</th>
      <th scope="col">승인</th>
      <th scope="col">거절</th>
      <th scope="col">탈퇴</th>
    </tr>
  </thead>
  <tbody>
      {this.state.Notusers.map(user=>
  <tr class="table-active" >
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.cod}</td>
      <td><button type="button" class="btn btn-primary disabled btn-sm" onClick={(e)=>{this.updateAuth(e,user);}}>승인</button></td>
      <td><button type="button" class="btn btn-primary disabled btn-sm" onClick={(e)=>{this.deleteUser(e,user.cod);}}>거절</button></td>
      <td>-</td>
    </tr>
      )}
      {this.state.users.map(user=> 
  <tr class="table-default" >
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.cod}</td>
      <td>-</td>
      <td>-</td>
      <td><button type="button" class="btn btn-primary disabled btn-sm" onClick={(e)=>{this.deleteUser(e,user.cod);}}>탈퇴</button></td>
    </tr>
      )}
    </tbody>
</table>
</div>
        );
    }
}
export default AdminComponent;