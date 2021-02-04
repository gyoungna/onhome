import React, {Component} from 'react';
import ApiService from "../../ApiService";

class RegisterComponent extends Component{

    state={
        name:'',
        id:'',
        pw:'',
        email:''
    }

    onChange=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        });
    }

    insertMember=(e) =>{
        e.preventDefault();

        let member={
            id:this.state.id,
            pw:this.state.pw,
            name:this.state.name,
            email:this.state.email,
        }

        ApiService.insertMember(member)
        .then(res=>{

            console.log("성공");
    })
    .catch(err=>{
        console.log('error',err);
    })
}
    render(){
        return(
<div>
    <h1>
   회원가입
    </h1>
    <form>
		<div>
            <label >이름</label>
            <input type="text" name="name" value={this.state.name} onChange={this.onChange} placeholder = "회원이름" />
        </div>
        <div>
            <label >아이디</label>
             <input type="text" name="id" value={this.state.id} onChange={this.onChange} placeholder = "회원아이디" />
        </div>
        
        <div>
            <label >비밀번호</label>
            <input type="password" name="pw" value={this.state.pw} onChange={this.onChange} placeholder = "회원 비밀번호" />
        </div>
         <div>
            <label >이메일</label>
            <input type="text" name="email" value={this.state.email} onChange={this.onChange} placeholder = "회원이메일" />
        </div>
        
            <button onClick={this.insertMember}>회원가입</button>

	</form>
</div>
        );
    }
}
export default RegisterComponent;