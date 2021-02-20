import React, {Component} from 'react';
import 'react-bootstrap';
import ApiService from '../../ApiService';
import axios from 'axios';

class RegisterComponent extends Component{


    state={
        auth:'',
        user:'',
        canId:false,
        canCo:false
     }
 
    componentDidMount(){
        this.setState({
            auth:localStorage.getItem('auth')
        })

    }
    
    
    onChange=(e)=>{
        this.setState({
            user:{
                ...this.state.user,
                [e.target.name]:e.target.value
            }
            
        });
    }

    insert=(e)=>{
        e.preventDefault();
        var user=this.state.user;
        if(!user.id||!user.pw||!user.checkpw||!user.name||!user.email||!user.cod){
            alert('입력되지 않은 란이 있습니다. 입력해주세요');
        }
        else if(!this.state.canId){
            alert('아이디 중복확인해주세요');
        }
        else if(user.pw!=user.checkpw){
            alert('비밀번호가 일치하지 않습니다. 확인해주세요');
        }
        else if(this.state.auth=='NOSTU'){
            axios.get("http://localhost:8080/cod"+'/'+user.cod).then(res=>{
                var cod=res.data;
                if(cod){
                    user.auth='NOSTU';
                    ApiService.insertUser(user).then(res=>{
                        alert('회원가입에 성공했습니다. 승인 전까지는 로그인이 불가능합니다');
                        this.props.history.push('/main');
                    })
                    .catch(err=>{
                        console.log('user post fail');
                    })
                }
                else{
                    alert('존재하지 않은 코드입니다.');
                }
            })
            .catch(err=>{
                alert('코드 확인에 실패했습니다. 다시 확인해주세요');
                console.log('cod load fail');
            })
            
        }
        else if(this.state.auth=='NOTEA'){
           if(!this.state.canCo){
               alert('코드 중복확인해주세요');
           }
           else{
               var cod=new Object();
               cod.cod=user.cod;
            axios.post("http://localhost:8080/cod",cod)//코드 등록
            .then(res=>{
                user.auth='NOTEA';
                ApiService.insertUser(user)//회원 등록
                .then(res=>{
                    alert('회원가입에 성공했습니다. 승인 전까지는 로그인이 불가능합니다');
                        this.props.history.push('/main');
                })
                .catch(err=>{
                    console.log('user post fail');
                })
            })
            .catch(err=>{
                console.log('cod post fail');
            })

           }

        }
        
    }
    checkId=(e)=>{
        e.preventDefault();

        if(!this.state.user.id){
            alert('아이디를 입력해주세요');
            return;
        }
        ApiService.loadUser(this.state.user.id)
        .then(res=>{
            var user=res.data;
            if(user){
                alert('이미 사용중인 아이디입니다.');
            }
            else{
                alert('사용가능한 아이디입니다.');
                this.setState({
                    canId:true
                })

            }
        })
        .catch(err=>{
            console.log('check id fail',err);
        })
    }
    checkCod=(e)=>{
        e.preventDefault();
        if(!this.state.user.cod){
            alert('코드를 입력해주세요');
            return;
        }
        axios.get("http://localhost:8080/cod"+'/'+this.state.user.cod).then(res=>{
            var temp=res.data;
            if(temp){
                alert('이미 존재하는 코드입니다.');
            }
            else if(!temp){
                alert('사용가능한 코드입니다.');
                this.setState({
                    canCo:true
                })
            }
    }).catch(err=>{
        alert('유효하지 않은 코드입니다.');
        console.log('get cod fail');
    })
    }

    
    render(){

        const auth=this.state.auth;
        let button=null;
        if(auth==='NOTEA'){
             button=<button style={{display:"inline-block",position:"relative",width:"80px", height:"30px"}} type="button" class="btn btn-primary btn-sm " onClick={this.checkCod}>중복확인</button>; 
        }

        const hStyle={
            position:"absolute",
            width:"800px",
            height:"100px",
            top:"10%",
            left:"50%",
            transform:"translate(-50%,-50%)",

        };
        
        return(
    <div style={hStyle}>
    <h1 style={{ padding:"20px",textAlign:"center"}}>
    <a href="/main" style={{color:"#5a5a5a"}}>
    숙제 In
    </a>
    </h1 >
    <ul class="nav nav-pills" style={{paddingBottom:"5px"}}>
  <li class="nav-item" ></li>
  </ul>
  <legend style={{borderTop:"3px solid #56cc9d",paddingTop:"25px", borderBottom:"1px solid gray"}}>회원가입</legend>
    <form style={{ paddingTop:"40px",paddingLeft:"250px"}}>
        <div>
            <label style={{display:"inline-block",position:"relative",width:"140px", height:"40px"}}>ID:</label>
             <input style={{display:"inline-block",position:"relative",width:"150px", height:"30px"}} type="text" class="form-control" name="id" value={this.state.user.id} onChange={this.onChange}/>
             &nbsp;&nbsp;
             <button style={{display:"inline-block",position:"relative",width:"80px", height:"30px"}} type="button" class="btn btn-primary btn-sm " onClick={this.checkId}>중복확인</button>        
        </div>
        <div>
            <label style={{display:"inline-block",position:"relative",width:"140px", height:"40px"}}>PASSWORD:</label>
            <input style={{display:"inline-block",position:"relative",width:"150px", height:"30px"}} type="password" class="form-control" name="pw" value={this.state.user.pw} onChange={this.onChange}/>
        </div>
        <div>
            <label style={{display:"inline-block",position:"relative",width:"140px", height:"40px"}}>PASSWORD 확인:</label>
            <input style={{display:"inline-block",position:"relative",width:"150px", height:"30px"}} type="password" class="form-control" name="checkpw" value={this.state.user.checkpw} onChange={this.onChange}/>
        </div>
        <div>
            <label style={{display:"inline-block",position:"relative",width:"140px", height:"40px"}}>NAME:</label>
            <input style={{display:"inline-block",position:"relative",width:"150px", height:"30px"}} type="text" class="form-control" name="name" value={this.state.user.name} onChange={this.onChange}/>
        </div>
        <div>
            <label style={{display:"inline-block",position:"relative",width:"140px", height:"40px"}} >Email:</label>
            <input style={{display:"inline-block",position:"relative",width:"150px", height:"30px"}} type="email" class="form-control" name="email" value={this.state.user.email} aria-describedby="emailHelp" onChange={this.onChange}/>
        </div>
        <div>
            <label style={{display:"inline-block",position:"relative",width:"140px", height:"40px"}}>CODE:</label>
            <input style={{display:"inline-block",position:"relative",width:"150px", height:"30px"}} type="text" class="form-control" name="cod" value={this.state.user.cod} onChange={this.onChange}/>
            &nbsp;&nbsp;
            {button}
        </div>
            <p></p>
            <button type="button" class="btn btn-primary btn-sm  " onClick={this.insert}>회원가입</button>
            
    </form>
    </div>
        );
    }

}export default RegisterComponent;