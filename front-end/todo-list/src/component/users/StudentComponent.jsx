import React, {Component} from 'react';
import axios from 'axios';
import ApiService from '../../ApiService';
import moment from 'moment';


export default class StudentComponent extends Component{


        state = {
            user:'',
            yet:[],
            done:[]
        }
        componentWillMount(){
            if(localStorage.getItem('auth')!='STU'){
                alert("권한이 없습니다.");
                alert("로그아웃됩니다.");
                this.logout(null);
                
            }
        }
       
    componentDidMount(props){
        this.setupAxiosInterceptors();

        ApiService.loadUser(localStorage.getItem('authenticatedUser'))
        .then(res=>{
            
            this.setState({
                user:res.data
            },()=>{

                this.reload();
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


    reload=()=>{
        var yet=[];
        var done=[];
        

        axios.get("http://localhost:8080/omr/cod/"+this.state.user.cod+'/ban/'+this.state.user.ban).then(res=>{
            yet=res.data;
            axios.get("http://localhost:8080/score/id/"+this.state.user.id)
            .then(res=>{
                done=res.data;
                for(var i=0;i<done.length;i++){
                    for(var j=0;j<yet.length;j++){
                        if(done[i].num==yet[j].num){
                            yet.splice(j,1);
                            break;
                        }
                    }
                }

                this.setState({
                    yet:yet,//omr   
                    done:done//score
                })
            })
            .catch(err=>{
                console.log('load done error');
            })
        })
        .catch(err=>{
            console.log('load yet error',err);
            
        })
       
 
    }
    logout=(e)=>{
        if(e)
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

    insert=(e,yet)=>{
        this.props.history.push({
            pathname:"/submit/score",
            state:{omr:yet, user:this.state.user}
        });
    }

    CheckScore=(e,done)=>{
        this.props.history.push({
            pathname:"/check/score",
            state:{score:done, user:this.state.user}
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

        
        var button='';
        var today=new Date();
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
        <legend style={{borderTop:"3px solid #56cc9d",paddingTop:"25px", borderBottom:"1px solid gray"}}>숙제 목록 <span class="badge badge-light" style={{display:"inline-block"}}>{this.state.user.cod}-{this.state.user.ban}</span></legend>
            <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">숙제 번호</th>
                <th scope="col">숙제명</th>
                <th scope="col">제출 기한 </th>
                <th scope="col">제출</th>
                <th scope="col"></th>
                <th scope="col">제출 시간</th>
                <th scope="col">오답</th>
              </tr>
            </thead>
            <tbody>
                {this.state.yet.map(yet=>{
                    var cla='';
                    var cf='';
                    var expi=moment(yet.expired).toDate();
                    console.log(typeof yet.expired);
                    console.log(typeof expi);
                    expi.setDate(expi.getDate()+1);//3월 7일(실제 마감일)+1=3월 8일 00:00로 변함
                if(today>expi){
                    button='제출불가';
                    cla="table-active";
                    cf='제출 마감'
                }
                else{
                    button=<button type="button" class="btn btn-primary disabled btn-sm" onClick={(e)=>{this.insert(e,yet);}}>제출</button>;
                    cla="table-default";
                    cf='-'
                }
            return(<tr class={cla} >
                <td>{yet.num}</td>
                <td>{yet.title}</td>
                <td>~{yet.expired}</td>
                <td>{button}</td>
                <td>{cf}</td>
                <td>-</td>
                <td>-</td>
              </tr>
            );
            }
                )}
                {this.state.done.map(done=>
            <tr class="table-light" >
                <td>{done.num}</td>
                <td>{done.title}</td>
                <td>~{done.expired}</td>
                <td>-</td>
                <td>제출완료</td>
                <td>{done.sub_time}</td>
                <td><button type="button" class="btn btn-primary disabled btn-sm" onClick={(e)=>{this.CheckScore(e,done)}}>오답 확인</button></td>
              </tr>
                
                )}
              </tbody>
          </table>
         </div>
        );
    }
    

}