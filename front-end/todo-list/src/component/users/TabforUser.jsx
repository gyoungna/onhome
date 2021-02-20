import React, {Component} from 'react';
import ApiService from "../../ApiService";
import LoginComponent from "../users/LoginComponent";
import axios from 'axios';
import {Form,Button,h1} from 'react-bootstrap';

export default class TabforUser extends Component{


        state = {
            Notusers:[],
            users:[],
            user:''
        }
       
    componentDidMount(props){
        ApiService.loadUser(localStorage.getItem('authenticatedUser'))
        .then(res=>{
            
            this.setState({
                user:res.data
            })
            this.reload();
        })
        .catch(err=>{
            console.log('load error');
        })
    }

    reload=()=>{
        axios.get("http://localhost:8080/users/auth/"+'NOSTU'+'/cod/'+this.state.user.cod).then(res=>{
            this.setState({
                Notusers:res.data
            })
        })
        .catch(err=>{
            console.log('load error');
            
        })
        axios.get("http://localhost:8080/users/auth/"+'STU'+'/cod/'+this.state.user.cod).then(res=>{
            this.setState({
                users:res.data
            })
        })
        .catch(err=>{
            console.log('load error');
        })
 
    }

    deleteUser=(e,user)=>{
        e.preventDefault();
        ApiService.deleteUser(user.id)
        .then(res=>{
            console.log("성공");
            this.reload();
        })
        .catch(err=>{
            console.log('delete error');
        })

    }
    update=(e,user,ban)=>{
        e.preventDefault();
        user.auth='STU';
        user.ban=ban;
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
       
        var Yetlength=this.state.Notusers.length;

        return(
            
    <div>
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
      <th scope="col">반</th>
      <th scope="col">승인</th>
      <th scope="col">거절</th>
      <th scope="col">탈퇴</th>
      <th scope="col">반변경</th>
    </tr>
  </thead>
  <tbody>
      {this.state.Notusers.map(user=>
  <tr class="table-active" >
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td><select multiple="" class="form-control" id="select1">
        {this.state.user.banList.map(ban=>
        <option>{ban}</option>
        )}
      </select></td>
      <td><button type="button" class="btn btn-primary disabled btn-sm" onClick={(e)=>{ let ban=document.getElementById('select1'); ban=ban.options[ban.selectedIndex].value; this.update(e,user,ban);}}>승인</button></td>
      <td><button type="button" class="btn btn-primary disabled btn-sm" onClick={(e)=>{this.deleteUser(e,user);}}>거절</button></td>
      <td>-</td>
      <td>-</td>
    </tr>
      )}
      {this.state.users.map(user=> 
  <tr class="table-default" >
      <td>{user.id}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td><select multiple="" class="form-control" id="select2">
        {this.state.user.banList.map(ban=>
        {
            if(ban==user.ban)
            return <option selected="selected">{ban}</option>;
            else
            return <option>{ban}</option>;
        }
            
        )}
      </select></td>
      <td>-</td>
      <td>-</td>
      <td><button type="button" class="btn btn-primary disabled btn-sm" onClick={(e)=>{this.deleteUser(e,user);}}>탈퇴</button></td>
      <td><button type="button" class="btn btn-primary disabled btn-sm" onClick={(e)=>{let ban=document.getElementById('select2'); ban=ban.options[ban.selectedIndex].value; this.update(e,user,ban);}}>변경</button></td>
    </tr>
      )}
    </tbody>
</table>
</div>
        );
    }
    

}