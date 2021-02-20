import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import RegisterComponent from "../users/RegisterComponent";
import LoginComponent from "../users/LoginComponent";
import TeacherComponent from "../users/TeacherComponent";
import AdminComponent from "../users/AdminComponent";
import EditComponent from "../users/EditComponent";
import PwComponent from "../users/PwComponent"
import EditOmr from "../omr/EditOmr";

//react 상에서의 url mapping
const AppRouter=()=>{
    return(
        <div>
            <BrowserRouter>
            <div style={style}>
                <Switch>
                    <Route path="/teacher" component={TeacherComponent}></Route>
                    <Route path="/register" component={RegisterComponent}></Route>
                    <Route path="/main" component={LoginComponent}></Route>
                    <Route path="/admin" component={AdminComponent}></Route>
                    <Route path="/pw" component={PwComponent}></Route>
                    <Route path="/edit" component={EditComponent}></Route>
                    <Route path="/update/omr" component={EditOmr}></Route>
                </Switch>
            </div>
            </BrowserRouter>
        </div>
    );
}

const style={
    clolr:'red',
    margin: '10px'
}

export default AppRouter;