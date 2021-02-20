import React, {Component} from 'react';
import ApiService from "../../ApiService";
import axios from 'axios';
import 'react-bootstrap';


class LoginComponent extends Component{

    state={
        id:'',
        pw:''
    }
    
    
    registerLoginForJwt(username,auth,token){
        window.localStorage.setItem('token', token);
        window.localStorage.setItem('authenticatedUser',username);
        window.localStorage.setItem('auth',auth);

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


    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    register=(e,auth)=>{
        e.preventDefault();

        localStorage.setItem('auth',auth);
        this.props.history.push('/register');
    }

    login=(e) =>{
        e.preventDefault();

        let user={
            id:this.state.id,
            pw:this.state.pw,
        }

        if(!this.state.id){
            alert('아이디를 입력해주세요');


        }
        else if(!this.state.pw){
            alert('비밀번호를 입력해주세요');
        }
        else{


        ApiService.login(user)
        .then(res=>{
            this.registerLoginForJwt(res.data.user.id,res.data.user.auth, res.data.accessToken);
          if(window.localStorage.getItem('auth')==='TEA'){
              this.props.history.push('/teacher');
        
          }
          else if(window.localStorage.getItem('auth')==='ADM'){
              this.props.history.push('/admin');
          }
          else if(window.localStorage.getItem('auth')=='STU'){
              this.props.history.pusth('/student');
          }
          else{
              alert('아직 승인되지 않은 회원입니다.');
          }
           
    })
    .catch(err=>{
        console.log(err);
      alert('없는 회원이거나 비밀번호가 잘못 되었습니다. 다시 로그인해주세요.');
      this.setState  ({
        id:'',
        pw:''
      })
    })
}
    }
    render(){
        const hStyle={
            position:"absolute",
            width:"500px",
            height:"100px",
            top:"40%",
            left:"50%",
            transform:"translate(-50%,-50%)",

        }
        return(
    <div style={hStyle}>
    <h1 style={{borderBottom:"1px solid #56cc9d", padding:"10px"}}>
    숙제 In
    </h1 >
    <form>
        <div>
            <label>ID</label>
             <input type="text" class="form-control" name="id" value={this.state.id} onChange={this.onChange} placeholder = "ID" />
        </div>
        <div>
            <label >PASSWORD</label>
            <input type="password" class="form-control" name="pw" value={this.state.pw} onChange={this.onChange} placeholder = "PASSWORD" />
        </div>
            <p></p>
            <button type="button" class="btn btn-outline-success " onClick={this.login}>로그인</button>
            &nbsp;&nbsp;&nbsp;&nbsp; 회원가입:&nbsp;
            <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-outline-success" onClick={(e)=>{this.register(e,'NOSTU');}}>학생</button>
            <button type="button" class="btn btn-outline-success" onClick={(e)=>{this.register(e,'NOTEA');}}>선생님</button>
            </div>
    </form>
    </div>
        );
    }
}
export default LoginComponent;