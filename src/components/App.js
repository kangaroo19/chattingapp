import { useEffect,useState } from "react";
import { authService as auth } from "../firebase";
import {  onAuthStateChanged, updateProfile,signInAnonymously } from "firebase/auth";
import Router from "./Router";


function App() {
  const [init,setInit]=useState(false) //나중에 로딩창으로 대체
  const [isLoggedIn,setIsLoggedIn]=useState(false) //로그인 되기 전에는 false
  const [userObj,setUserObj]=useState(null)
  useEffect(()=>{
    onAuthStateChanged(auth,async(user)=>{ //user의 값이 바뀔 때마다 실행됨
      if(user){ //로그인 되어있는 상태일때
        setIsLoggedIn(true)
        setUserObj({ //원래는 setUserObj(user)였는데 이렇게 하면 user객체의 크기가 너무 커서 리액트가 변화를 감지 못함 그래서 사용하는 것(이름,아이디,업데이트프로필)만 객체로 전달
          displayName:(user.displayName===null)?"Annoymous":user.displayName,
          uid:user.uid,
          userImg:user.photoURL,
          // updateProfile:(args)=>updateProfile(user,{displayName:user.displayName}) 
        })
        
      } else{
        setUserObj(null)
        setIsLoggedIn(false)
      }
      setInit(true)
    })
  },[])
  return (
    <>
      {init ? <Router
                 isLoggedIn={isLoggedIn}
                 userObj={userObj}/> 
                 :"init"}
    </>
  );
}

export default App;
