import React, {Component} from 'react';
import axios from 'axios';


export default class CheckSubmission extends Component{


        state = {
            user:this.props.location.state.user,
            omr:this.props.location.state.omr,
            done:[],
            yet:[]

    
        }

       
    componentDidMount(props){
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
        var yet=[];
        var done=[];
        

        axios.get("http://localhost:8080/users/cod/"+this.state.user.cod+"/ban/"+this.state.omr.ban).then(res=>{
            yet=res.data;//특정 반 학생들,users
            axios.get("http://localhost:8080/score/cod/"+this.state.omr.cod+'/ban/'+this.state.omr.ban+'/num/'+this.state.omr.num)
            .then(res=>{
                done=res.data;//숙제한 학생들의 score
                for(var i=0;i<done.length;i++){
                    for(var j=0;j<yet.length;j++){
                        if(done[i].id==yet[j].id){
                            yet.splice(j,1);
                            break;
                        }
                    }
                }

                this.setState({
                    yet:yet,//users  
                    done:done//score
                })
            })
            .catch(err=>{
                console.log('load done(score) error');
            })
        })
        .catch(err=>{
            console.log('load yet(users) error',err);
            
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

    check=(e,done)=>{
        this.props.history.push({
            pathname:"/check/score",
            state:{score:done, user:this.state.user}
        });
    }

    rate=(e)=>{
        this.props.history.push({
            pathname:"/check/rate",
            state:{score:this.state.done, user:this.state.user, omr:this.state.omr}
        });
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

        return(
    <div style={hStyle}>
    <h1 style={{ padding:"20px",textAlign:"center"}}>
    onHome
    </h1 >
    <ul class="nav nav-pills" style={{paddingBottom:"5px"}}>
  <li class="nav-item" ><a class="nav-link active" href="#" onClick={(e)=>{e.preventDefault(); this.props.history.push('/teacher');}} >선생님 페이지</a></li>
  <div style={{position:"absolute", right:"10px"}}>
  <li style={{display:"inline-block"}}><small class="form-text text-muted " style={{position:"relative", paddingTop:"3px"}}>안녕하세요 {this.state.user.id}선생님!!</small></li>
  <li class="nav-item" style={{display:"inline-block"}}><a class="nav-link"  href="#" onClick={this.editUser}>회원 정보 수정</a></li>
  <li class="nav-item" style={{display:"inline-block"}}><a class="nav-link" href="#" onClick={this.logout}>로그아웃</a></li>
</div>
</ul>
<legend style={{ borderTop:"3px solid #56cc9d",paddingTop:"25px",borderBottom:"1px solid gray", display:"inline-block"}}>제출현황 &nbsp;<small class="form-text text-muted" style={{display:"inline-block"}}>반: {this.state.omr.ban} | 숙제명: {this.state.omr.title}</small></legend>
<button type="button" class="btn btn-outline-success btn-sm" style={{marginBottom:"5px"}} onClick={this.rate}>오답률 확인</button>
        <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">학생 이름</th>
                <th scope="col">제출여부</th>
                <th scope="col">제출 시간</th>
                <th scope="col">오답</th>
              </tr>
            </thead>
            <tbody>
            {this.state.yet.map(yet=>
            <tr class="table-light" >
                <td>{yet.id}</td>
                <td>미제출</td>
                <td>-</td>
                <td>-</td>
              </tr>
                )}
                 {this.state.done.map(done=>
            <tr class="table-default" >
                <td>{done.id}</td>
                <td>제출 완료</td>
                <td>{done.sub_time}</td>
                <td><button type="button" class="btn btn-primary disabled btn-sm" onClick={(e)=>{this.check(e,done);}}>오답 확인</button></td>
              </tr>
                )}
              </tbody>
          </table>
         </div>
        );
    }
    

}