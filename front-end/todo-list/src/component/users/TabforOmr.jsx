import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import Pagination from "./Pagination";

export default class TabforOmr extends Component{


        state = {
            ban:null,
            user:'',
            omr:[],
            omrPerPage:5,
            currentPage:1

        }
       
    componentDidMount(props){
        //console.log(typeof this.props.ban);
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

    deleteBan=(e)=>{
        e.preventDefault();
        var list=this.state.user.banList;
        var idx=list.indexOf(this.state.ban);
        list.splice(idx,1);
        var temp=list[0];
        var u=this.state.user;
        for(var i=1;i<list.length;i++){
            temp+=';'+list[i];
        }
        u.ban=temp;
        console.log(temp);


        axios.put("http://localhost:8080/users/"+this.state.user.id,u)
        .then(res=>{
        axios.get("http://localhost:8080/users/cod/"+this.state.user.cod+"/ban/"+this.state.ban)
        .then(res=>{
                //console.log(res.data);
                axios.put("http://localhost:8080/users",res.data)
                .then(res=>{
                    axios.delete("http://localhost:8080/omr/cod/"+this.state.user.cod+"/ban/"+this.state.ban)
                    .then(res=>{
                        axios.delete("http://localhost:8080/score/cod/"+this.state.user.cod+"/ban/"+this.state.ban)
                        .then(res=>{
                            console.log('delete success');
                            alert('반이 삭제되었습니다.');
                            document.location.href = "/teacher";
                        })
                    })
                })
           
        })

    })




    }

    insertOmr=(e)=>{
        e.preventDefault();
        this.props.history.push({
            pathname:"/insert/omr",
            state:{ban:this.state.ban, user:this.state.user}
        });
    }

    check=(e,omr)=>{
        this.props.history.push({
            pathname:"/check/submission",
            state:{user:this.state.user, omr:omr}
        });
    }
    
    paginate=(pageNum)=>{this.setState({
        currentPage:pageNum
    })}
    render(){
        var today=new Date();
        const indexOfLast = this.state.currentPage * this.state.omrPerPage;
        const indexOfFirst = indexOfLast - this.state.omrPerPage;
        const omrs=this.state.omr;
        const currentOmrs=omrs.slice(indexOfFirst,indexOfLast);
        
        return(
            
            <div>
                <div>
             <legend style={{paddingTop:"25px", borderBottom:"1px solid gray",display:"inline-block",paddingBottom:"2px"}}>&nbsp;&nbsp; {this.state.ban}반 &nbsp;&nbsp;
             <button type="button" class="btn btn-primary btn-sm" style={{display:"inline-block"}} onClick={this.deleteBan}>반 삭제</button>
             </legend>
            </div>
            <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">숙제 번호</th>
                <th scope="col">숙제명</th>
                <th scope="col">제출 기한</th>
                <th scope="col">제출 현황</th>
                <th scope="col">보기/수정</th>
                <th scope="col">삭제</th>   
              </tr>
            </thead>
            <tbody>       
            {currentOmrs.map(omr=>{
                var name='';
                var cf='';
                var expi=moment(omr.expired).toDate();
                expi.setDate(expi.getDate()+1);//3월 7일(실제 마감일)+1=3월 8일 00:00로 변함
                console.log(today);
                console.log(expi);
                if(today>expi){
                    name="table-light";
                    cf='(제출 마감)'
                }
                else{
                    name="table-default";
                }
                
            return(
                <tr class={name} >
                <td>{omr.num}</td>
                <td>{omr.title}</td>
                <td>~{omr.expired}{cf}</td>
                <td><button type="button" class="btn btn-primary disabled btn-sm" onClick={(e)=>{this.check(e,omr);}}>제출현황</button></td>
                <td><button type="button" class="btn btn-primary disabled btn-sm" onClick={(e)=>{this.updateOmr(e,omr);}}>보기/수정</button></td>
                <td><button type="button" class="btn btn-primary disabled btn-sm" onClick={(e)=>{this.deleteOmr(e,omr);}}>삭제</button></td>
              </tr>

            );
             }
              )}
              </tbody>
          </table>
          <button type="button" class="btn btn-primary btn-sm" style={{position:"absolute", right:"15px"}} onClick={this.insertOmr}>숙제 추가</button>
          <Pagination omrPerPage={this.state.omrPerPage} totalOmrs={this.state.omr.length} paginate={this.paginate}/>
          
          </div>
        );
    }
    

}