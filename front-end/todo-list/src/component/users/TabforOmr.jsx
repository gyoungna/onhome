import React, {Component} from 'react';
import axios from 'axios';


export default class TabforOmr extends Component{


        state = {
            ban:null,
            user:'',
            omr:[]
        }
       
    componentDidMount(props){
        //console.log(this.props.ban);
        this.setState({
            ban:this.props.ban,
            user:this.props.user
        },()=>{
            this.reload();

        })
        
       
    } 
    reload=()=>{
        axios.get("http://localhost:8080/omr/cod/"+this.state.user.cod+'/ban/'+this.state.ban).then(res=>{
            this.setState({
               omr:res.data
            })
        })
        .catch(err=>{
            console.log('load error');
            
        })
       
 
    }

    deleteOmr=(e,omr)=>{
        e.preventDefault();
        axios.delete("http://localhost:8080/omr/cod/"+omr.cod+'/ban/'+omr.ban+'/num/'+omr.num)
        .then(res=>{
            console.log("성공");
            this.reload();
        })
        .catch(err=>{
            console.log('delete error');
        })

    }

    updateOmr=(e,omr)=>{
        e.preventDefault();
        console.log(omr);
            this.props.history.push({
                pathname:"/update/omr",
                state:{omr:omr, user:this.state.user}
            });
        

    }
    
    
    render(){
       
        
        return(
            
            <div>
             <legend style={{paddingTop:"25px", borderBottom:"1px solid gray"}}>&nbsp;&nbsp;{this.state.ban}반 </legend>
            <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">번호</th>
                <th scope="col">이름</th>
                <th scope="col">제출 현황</th>
                <th scope="col">보기</th>
                <th scope="col">수정</th>
                <th scope="col">삭제</th>   
              </tr>
            </thead>
            <tbody>
                {this.state.omr.map(omr=>
            <tr class="table-default" >
                <td>{omr.num}</td>
                <td>{omr.title}</td>
                <td><button type="button" class="btn btn-primary disabled btn-sm" onClick={(e)=>{}}>제출현황</button></td>
                <td><button type="button" class="btn btn-primary disabled btn-sm" onClick={(e)=>{}}>보기</button></td>
                <td><button type="button" class="btn btn-primary disabled btn-sm" onClick={(e)=>{this.updateOmr(e,omr);}}>수정</button></td>
                <td><button type="button" class="btn btn-primary disabled btn-sm" onClick={(e)=>{this.deleteOmr(e,omr);}}>삭제</button></td>
              </tr>
                )}
              </tbody>
          </table>
          <button type="button" class="btn btn-primary btn-sm" style={{position:"absolute", right:"15px"}} onClick={(e)=>{}}>숙제 추가</button>
          </div>
        );
    }
    

}