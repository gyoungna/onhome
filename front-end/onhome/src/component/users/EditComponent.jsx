import React, {Component} from 'react';
import 'react-bootstrap';
import ApiService from '../../ApiService';
import axios from 'axios';

class EditComponent extends Component{


    state={
        user:''
     }//this.setState()할때마다 rerendering
 
    componentDidMount(){
        this.setupAxiosInterceptors();
        ApiService.loadUser(localStorage.getItem('authenticatedUser'))
        .then(res=>{
            this.setState({
                user:res.data
            })
        })
        .catch(err=>{
            console.log('load error');
        })

        
        
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
            user: {
                [e.target.name]:e.target.value
            }
    
        });
    }

    update=(e)=>{
        var user=this.state.user;
        if(!user.name||!user.email)
        alert('입력되지 않은 란이 있습니다.');
        else{
        ApiService.updateUser(this.state.user)
        .then(res=>{
            alert('회원 정보가 변경되었습니다.')
            if(this.state.user.auth=='ADM')
            {
                this.props.history.push('/admin');
            }
            else if(this.state.user.auth=='TEA')
                this.props.history.push('/teacher');
            else
                this.props.history.push('/student');
        })
        .catch(err=>{
            console.log('update  error');
        })
    }

    }

    deleteUser=(e)=>{
        
       if(this.state.user.auth==='TEA'){
        axios.delete("http://localhost:8080/cod"+'/'+this.state.user.cod)
        .then(res=>{
            console.log('해당 선생님 탈퇴 성공');
            document.location.href = "/main";
        })
        .catch(err=>{
            console.log('delete TEA error');
        })
       }
       else if(this.state.user.auth=='STU'){
        ApiService.deleteUser(this.state.user.id)
        .then(res=>{
            console.log("해당 학생 탈퇴 성공");
            document.location.href = "/main";
        })
        .catch(err=>{
            console.log('delete STU error');
        })
       }
       
    }

    
   
    render(){
        const hStyle={
            position:"absolute",
            width:"800px",
            height:"100px",
            top:"10%",
            left:"50%",
            transform:"translate(-50%,-50%)",

        };

        const lStyle={
            display:"inline-block",
            position:"relative"
            ,width:"140px",
             height:"40px",

        }

        const iStyle={
            display:"inline-block",
            position:"relative",
            width:"150px", 
            height:"30px",
        }

        const mStyle={
            position:"absolute",
            width:"500px",
            height:"300px",
            top:"20%",
            left:"30%",



        }
        var auth=this.state.user.auth;
        
        if(auth=='ADM')
            auth='관리자';
        else if(auth=='TEA')
            auth='선생님';
        else if(auth=='STU')
            auth='학생';
        return(
    <div>
    <div style={hStyle}>
    <h1 style={{ padding:"20px",textAlign:"center"}}>
    <a href="#" style={{color:"#5a5a5a"}} onClick={(e)=>{e.preventDefault(); if(this.state.user.auth=='ADM')this.props.history.push('/admin'); else if(this.state.user.auth=='TEA') this.props.history.push('/teacher'); else if(this.state.user.auth=='STU') this.props.history.push('/student');}}>
    onHome
    </a>
    </h1 >
    <ul class="nav nav-pills" style={{paddingBottom:"5px"}}>
  <li class="nav-item" ><a class="nav-link active" href="#" onClick={(e)=>{e.preventDefault();  if(this.state.user.auth=='ADM')this.props.history.push('/admin'); else if(this.state.user.auth=='TEA') this.props.history.push('/teacher'); else if(this.state.user.auth=='STU') this.props.history.push('/student');}} >{auth} 페이지</a></li>
  </ul>
  <legend style={{borderTop:"3px solid #56cc9d",paddingTop:"25px", borderBottom:"1px solid gray"}}>회원정보 수정 </legend>
    <form>
        <div>
            <label style={lStyle}>ID</label>
             <input style={iStyle} type="text" class="form-control" name="id" value={this.state.user.id} readonly=""/>
        </div>
        <div>
            <label style={lStyle}>PASSWORD</label>
            <input style={iStyle} type="password" class="form-control" name="pw" value={this.state.user.pw} readonly=""/>
            &nbsp;&nbsp;
             <button style={{display:"inline-block",position:"relative",width:"120px", height:"30px"}} type="button" class="btn btn-primary btn-sm " onClick={(e)=>{e.preventDefault(); this.props.history.push('/pw')}}>비밀번호 변경</button>        
        </div>
        <div>
            <label style={lStyle}>NAME</label>
            <input style={iStyle} type="text" class="form-control" name="name" value={this.state.user.name} onChange={(e) => this.setState({user:{...this.state.user,name: e.target.value}})}/>
        </div>
        <div>
            <label style={lStyle}>Email</label>
            <input style={iStyle} type="email" class="form-control" name="email" value={this.state.user.email} aria-describedby="emailHelp" readonly=""/>
        </div>
        <div>
            <label style={lStyle}>CODE</label>
            <input style={iStyle} type="text" class="form-control" value={this.state.user.cod} readonly=""/>
        </div>
            <p></p>
            <button type="button" class="btn btn-outline-success" onClick={this.update}>변경</button> &nbsp;
            <button type="button" class="btn btn-outline-success" data-toggle="modal" data-target="#myModal">탈퇴</button>      
    </form>
    </div>
    <div class="modal fade" id="myModal" style={mStyle} role="dialog">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <p>정말 탈퇴하시겠습니까?</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onClick={this.deleteUser}>예</button>
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">아니오</button>
                        </div>
                    </div>
                </div>
    </div>

</div>

    
        );
    }

}export default EditComponent;