import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import RegisterComponent from "../users/RegisterComponent";
import LoginComponent from "../users/LoginComponent";
import TeacherComponent from "../users/TeacherComponent";
import AdminComponent from "../users/AdminComponent";
import EditComponent from "../users/EditComponent";
import PwComponent from "../users/PwComponent"
import EditOmr from "../omr/EditOmr";
import InsertOmr from "../omr/InsertOmr";
import StudentComponent from "../users/StudentComponent";
import SubmitScore from "../score/SubmitScore";
import CheckScore from "../score/CheckScore";
import CheckSubmission from "../score/CheckSubmission";
import CheckRate from "../score/CheckRate";
import PrivateRoute from "./PrivateRoute";


//react 상에서의 url mapping
const AppRouter=()=>{
    return(
        <div>
            <BrowserRouter>
            <div style={style}>
                <Switch>
                    <PrivateRoute path="/teacher" component={TeacherComponent}></PrivateRoute>
                    <Route path="/register" component={RegisterComponent}></Route>
                    <Route path="/main" component={LoginComponent}></Route>
                    <PrivateRoute path="/admin" component={AdminComponent}></PrivateRoute>
                    <PrivateRoute path="/pw" component={PwComponent}></PrivateRoute>
                    <PrivateRoute path="/edit" component={EditComponent}></PrivateRoute>
                    <PrivateRoute path="/update/omr" component={EditOmr}></PrivateRoute>
                    <PrivateRoute path="/insert/omr" component={InsertOmr}></PrivateRoute>
                    <PrivateRoute path="/student" component={StudentComponent}></PrivateRoute>
                    <PrivateRoute path="/submit/score" component={SubmitScore}></PrivateRoute>
                    <PrivateRoute path="/check/score" component={CheckScore}></PrivateRoute>
                    <PrivateRoute path="/check/submission" component={CheckSubmission}></PrivateRoute>
                    <PrivateRoute path="/check/rate" component={CheckRate}></PrivateRoute>
                    
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