import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import RegisterComponent from "../member/RegisterComponent";

const AppRouter=()=>{
    return(
        <div>
            <BrowserRouter>
            <div style={style}>
                <Switch>
                    <Route path="/register" component={RegisterComponent}></Route>
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