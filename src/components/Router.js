import React, { useState } from "react";
import { HashRouter as Router,Route,Switch } from "react-router-dom";
import Navigation from './Navigation'
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Profile from "../routes/Profile";
import RoomList from "../routes/RoomList";
import Room from "../routes/Room";

export default ({refreshUser,isLoggedIn,userObj})=>{
    return (
        <Router>
            {isLoggedIn && <Navigation userObj={userObj}/>}
            <Switch>
                {isLoggedIn ?
                <>
                <Route exact path="/">
                    <Home userObj={userObj}/>
                </Route>
                <Route exact path="/roomlist">
                    <RoomList userObj={userObj}/>
                </Route>
                <Route exact path="/profile">
                    <Profile userObj={userObj} refreshUser={refreshUser}/>
                </Route>
                <Route exact path="/room">
                    <Room userObj={userObj}/>
                </Route>
                </>
                :
                <Route exact path="/"><Auth/></Route>
                }
            </Switch>
        </Router>
    )
}

