//유저목록 화면
//로그인 이후 볼 수 있는 화면
import { onAuthStateChanged } from "firebase/auth"
import { authService } from "../firebase"
import { dbService } from "../firebase"
import { ref, set } from "firebase/database";
import { doc,addDoc, collection, setDoc,query,onSnapshot,orderBy, QuerySnapshot } from "firebase/firestore";
import { useEffect,useState } from "react";
import { Link } from "react-router-dom";

function Home({userObj}){
    const [users,setUsers]=useState([])
    useEffect(()=>{
        const q=query(collection(dbService,"users"))
        const un=onSnapshot(q,(querySnapshot)=>{
        const array=[]
        querySnapshot.forEach((doc)=>{
            array.push(doc.data())
        })
        setUsers(array)
    })
    },[])
    const onClick=(event)=>{
        console.log(event.target.name)
    }
    return (
        <>
            <span>유저목록</span>
            {users.map((v)=>(
                <div key={v.uid}>
                    {v.userName}
                    {v.uid===userObj.uid?null:<Link to={{pathname:'/room',user:v}}><button>대화</button></Link>}
                </div>
            ))}
        </>

    )
}

export default Home