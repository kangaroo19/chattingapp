import React, { useState } from "react";
import { HashRouter as Router,Route,Switch } from "react-router-dom";
import Navigation from './Navigation'
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Room from "../routes/Room";
import Profile from "../routes/Profile";

export default ({isLoggedIn,userObj})=>{
    return (
        <Router>
            {isLoggedIn && <Navigation userobj={userObj}/>}
            <Switch>
                {isLoggedIn ?
                <>
                <Route exact path="/">
                    <Home userObj={userObj}/>
                </Route>
                <Route exact path="/room">
                    <Room userObj={userObj}/>
                </Route>
                <Route exact path="/profile">
                    <Profile userObj={userObj}/>
                </Route>
                </>
                :
                <Route exact path="/"><Auth/></Route>
                }
            </Switch>
        </Router>
    )
}

