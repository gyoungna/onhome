import React, {Component} from 'react';
import 'react-bootstrap';
import ApiService from '../../ApiService';
import axios from 'axios';

class PwComponent extends Component{


    state={
        user:'',
        original:'',
        change:'',
        onemore:'',
        encode:false
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
        
                [e.target.name]:e.target.value
        
    
        });
    }

    updatePw=(e)=>{
     
        if(!this.state.original||!this.state.change||!this.state.onemore){
            alert('입력되지 않은 란이 있습니다. 입력해주세요');
        }
        else
        {
            axios.get("http://localhost:8080/users/"+this.state.user.id+'/pw/'+this.state.original)
        .then(res=>{
            this.setState({
                encode:res.data
            })
            if(!this.state.encode)
            alert('기존 비밀번호가 틀립니다.');
            else if(this.state.change!=this.state.onemore){
                alert('변경되는 비밀번호가 일치하지 않습니다.');
            }
            else if(this.state.change==this.state.original){
                alert('변경할 비밀번호는 기존의 비밀번호와 달라야 합니다.');
    
            }
            else{
                this.state.user.pw=this.state.change;
                ApiService.updateUser(this.state.user)
                .then(res=>{
                    alert('비밀번호가 변경되었습니다.')
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
                    alert('비밀번호 변경 실패');
                    console.log('insert user fail');
            })
    
            }
        })
        .catch(err=>{
            console.log('get pw fail');
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

        };

        const iStyle={
            display:"inline-block",
            position:"relative",
            width:"150px", 
            height:"30px",
        };
        return(
    <div style={hStyle}>
    <h1 style={{ padding:"20px",textAlign:"center"}}>
    <a href="#" style={{color:"#5a5a5a"}}onClick={(e)=>{e.preventDefault(); this.props.history.push('/admin');}}>
    onHome
    </a>
    </h1 >
    <ul class="nav nav-pills" style={{paddingBottom:"5px"}}>
  <li class="nav-item" ><a class="nav-link active" href="#" onClick={(e)=>{e.preventDefault(); this.props.history.push('/admin');}} >관리자 페이지</a></li>
  </ul>
  <legend style={{borderTop:"3px solid #56cc9d",paddingTop:"25px", borderBottom:"1px solid gray"}}>비밀번호 변경 </legend>
    <form>
        <div>
            <label style={lStyle}>기존 비밀번호</label>
            <input style={iStyle} type="password" class="form-control" name="original" value={this.state.original} onChange={this.onChange}/>
        </div>
        <div>
            <label style={lStyle}>변경할 비밀번호</label>
            <input style={iStyle} type="password" class="form-control" name="change" value={this.state.user.change} onChange={this.onChange}/>
        </div>
        <div>
            <label style={lStyle}>비밀번호 확인</label>
            <input style={iStyle} type="password" class="form-control" name="onemore" value={this.state.user.onemore} onChange={this.onChange}/>
        </div>
            <p></p>
            <button type="button" class="btn btn-outline-success " onClick={this.updatePw}>변경</button>
            
    </form>
    </div>
        );
    }

}export default PwComponent;